
module Solution

  Ranges = [1, 2, 3, 5].map { |num| num * 7 }

  class << self

    def to_binary(days)
      binary = Array.new(30) { 0 }
      days.each { |day| binary[day - 1] = 1 }
      binary
    end

    def min_price_for_days(days)

      days_length = days.count

      return [7, days.reduce(0, :+) * 2 ].min if days_length <= 7

      (0...Ranges.count - 1).each do |range_index|
        range, next_range = Ranges[range_index], Ranges[range_index + 1]

        if days_length <= next_range

          possible_results = []

          (0..(days_length - range)).each do |range_start|
            range_end = range_start + range
            min_price_left = min_price_for_days(days[0...range_start])
            min_price_range = min_price_for_days(days[range_start...range_end])
            min_price_right = min_price_for_days(days[range_end...days_length])
            possible_result = min_price_left + min_price_range + min_price_right
            possible_results << possible_result
          end

          return possible_results.min
        end

      end
    end

    def run(days)
      return 25 if days.count >= 23
      bin_array = to_binary(days)
      return min_price_for_days(bin_array)
    end

  end

end

months = [
    [1, 2, 4, 5, 7, 29, 30],  # => 11 // original example
    [5],  # => 2
    [5, 7],  # => 4
    [5, 6, 8],  # => 6
    [15, 16, 17, 18, 19, 20, 21, 22],  # => 9
    [2, 6, 7, 8, 9, 10],  # => 9 // should take the right side
    [1, 2, 5, 6, 7, 8, 9, 10, 12, 13],  # => 14 // should not take from middle even is max possible but should split in two
    [1, 2, 5, 6, 7, 8, 9, 10, 12, 13, 15, 16, 17],  # => 18
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 23],  # => 23
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],  # => 25
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],  # => 25
]

start = Time.now
months.each do |days|
  puts "#{ days.join(' ') } => #{ Solution::run(days) }"
end
finish = Time.now
puts "time: #{((finish - start) * 1000).round} ms"


