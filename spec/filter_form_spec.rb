# frozen_string_literal: true

class MovieFilterForm < FrontendHelpers::FilterForm
  attribute :name_i_cont, :string
  attribute :genre_in, default: []

  def scope
    @scope.active.order('UPPER(name) ASC')
  end
end

RSpec.describe FrontendHelpers::FilterForm do
  let(:tenant) { Tenant.create(name: 'Test') }
  let(:form) { MovieFilterForm.new(tenant.movies, params({ name_i_cont: 'Iron' })) }

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

  describe '#permitted_attributes' do
    it 'returns an array of permitted attributes' do
      expect(form.permitted_attributes).to eql(
        ['s', 'name_i_cont', { 'genre_in' => [] }]
      )
    end
  end

  describe '#array_attributes' do
    it 'returns an array of array attributes' do
      expect(form.array_attributes).to eql(['genre_in'])
    end
  end

  describe '#active_filters_count' do
    it 'returns the number of active filters' do
      form = MovieFilterForm.new(tenant.movies, params({ genre_in: ['Action'] }))
      expect(form.active_filters_count).to eql(1)
    end
  end

  describe '#active_filters?' do
    it 'returns true with movie name filter' do
      form = MovieFilterForm.new(tenant.movies, params({ name_i_cont: 'Iron' }))
      expect(form.active_filters?).to be true
    end

    it 'returns true with movie genre filter' do
      form = MovieFilterForm.new(tenant.movies, params({ genre_in: ['Action'] }))
      expect(form.active_filters?).to be true
    end

    it 'returns false without any filters' do
      form = MovieFilterForm.new(tenant.movies, params({}))
      expect(form.active_filters?).to be false
    end
  end

  describe '#query_params' do
    it 'returns a hash of attributes and values' do
      expect(form.query_params).to eql(
        { 'genre_in' => [], 'name_i_cont' => 'Iron', 's' => nil }
      )
    end
  end

  describe '#result' do
    let(:records) { form.result }

    it 'returns records matching the query and default scope' do
      expect(records.size).to eql(2)
      expect(records.map(&:name)).to include('Iron man 1', 'Iron man 2')
    end

    it 'orders results based on the scope order' do
      expect(records.first).to eql(@iron_man_1)
      expect(records.last).to eql(@iron_man_2)
    end
  end
end
