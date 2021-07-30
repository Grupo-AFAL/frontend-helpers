# frozen_string_literal: true

RSpec.describe FrontendHelpers::Types::TimeValue do
  describe 'integration with a model' do
    it 'casts a time value from integer to a date string' do
      workout = Workout.new(workout_start_at: 3600)
      expect(workout.workout_start_at).to eql("#{Date.current} 01:00:00")
    end

    it 'serializes a date string to a number in seconds' do
      workout = Workout.create(workout_start_at: "#{Date.current} 01:00:00")
      stored_value = workout.read_attribute_before_type_cast(:workout_start_at)
      expect(stored_value).to eql(3600)
    end
  end

  subject { FrontendHelpers::Types::TimeValue.new }

  describe '#cast' do
    it 'return a default time if value is blanck' do
      expect(subject.cast('')).to eql("#{Date.current} 00:00:00")
    end

    it 'returns value if is a date string' do
      date_string = "#{Date.current} 00:00:00"
      expect(subject.cast(date_string)).to eql(date_string)
    end

    it 'converts a integer to a date string' do
      expect(subject.cast(3_600)).to eql("#{Date.current} 01:00:00")
      expect(subject.cast(3_661)).to eql("#{Date.current} 01:01:01")
      expect(subject.cast(36_610)).to eql("#{Date.current} 10:10:10")
    end
  end

  describe 'serialize' do
    it 'returns value if is blank' do
      expect(subject.serialize("")).to eql("")
    end

    it 'returns value if is numeric' do
      expect(subject.serialize(3600)).to eql(3600)
    end

    it 'converts a date string to an integer' do
      expect(subject.serialize("#{Date.current} 01:00:00")).to eql(3_600)
      expect(subject.serialize("#{Date.current} 01:01:01")).to eql(3_661)
      expect(subject.serialize("#{Date.current} 10:10:10")).to eql(36_610)
    end
  end
end
