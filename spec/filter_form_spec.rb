# frozen_string_literal: true

class MovieFilterForm < FrontendHelpers::FilterForm
  attribute :name_i_cont, :string

  default_order 'UPPER(name) ASC'
  default_scope :active

  relationship :movies
  included_relationships :characters
end

RSpec.describe FrontendHelpers::FilterForm do
  let(:tenant) { Tenant.create(name: 'Test') }
  let(:form) { MovieFilterForm.new(tenant, params({ name_i_cont: 'Iron' })) }

  def params(filter_attributes)
    ActionController::Parameters.new(q: filter_attributes)
  end

  before do
    @iron_man_3 = tenant.movies.create(name: 'Iron man 3', status: 1)
    @iron_man_2 = tenant.movies.create(name: 'Iron man 2', status: 0)
    @iron_man_1 = tenant.movies.create(name: 'Iron man 1', status: 0)
    @snatch = tenant.movies.create(name: 'Snatch', status: 0)
    @inglorious_basterds = tenant.movies.create(name: 'Inglorious Basterds', status: 0)
  end

  describe '#initialize' do
    it 'initializes a form with provided attributes' do
      expect(form.name_i_cont).to eql('Iron')
    end
  end

  describe '#query_params' do
    it 'returns a hash of attributes and values' do
      expect(form.query_params).to eql({ 'name_i_cont' => 'Iron' })
    end
  end

  describe '#result' do
    let(:records) { form.result }

    it 'returns records matching the query and default scope' do
      expect(records.size).to eql(2)
      expect(records.map(&:name)).to include('Iron man 1', 'Iron man 2')
    end

    it 'orders results based on the default order' do
      expect(records.first).to eql(@iron_man_1)
      expect(records.last).to eql(@iron_man_2)
    end
  end
end
