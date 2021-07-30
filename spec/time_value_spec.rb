# frozen_string_literal: true

RSpec.describe do
  context 'cast' do
    it 'return a default time if value is blanck' do
      blank_value = Workout.create(workout_start_at: '')
      expect(blank_value.workout_start_at).to eql('2021-01-01 00:00:00')
    end

    xit 'returns value if value is a string' do
      string_value = Workout(workout_start_at: 'prueba')
      expect(string_value.workout_start_at).to eql('prueba')
    end

    it 'defines correct form for value in time format' do
      value = Workout.create(workout_start_at: 3665)
      expect(value.workout_start_at).to eql('2021-01-01 01:01:05')
    end
  end

  context 'serialize' do
    before do
      @workout = Workout.create(workout_start_at: 3600)
    end

    it 'serialize object to its original form' do
      @serialize_workout = @workout.serialize_object(@workout.workout_start_at)
      expect(@serialize_workout).to eql(3600)
    end

    it 'returns value if value is blank' do
      @serialize_blank_workout = @workout.serialize_object(@workout.workout_start_at = '')
      expect(@serialize_blank_workout).to eql('')
    end
  end
end
