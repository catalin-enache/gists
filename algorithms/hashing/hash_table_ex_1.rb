

class HashTableSeparateChaining

  H = 37

  def initialize(length = 137)
    @table = Array.new(length) { [] }
  end

  def hash(key)
    key.to_s.each_byte.reduce(0) do |memo, byte|
      memo + H * memo + byte
    end % @table.length
  end

  def put(key, data)
    index, _hash = 0, hash(key)
    index += 2 until [nil, key].include? @table[_hash][index]
    @table[_hash][index, 2] = key, data
  end

  def get(key)
    index, _hash = 0, hash(key)
    index += 2 until [nil, key].include? @table[_hash][index]
    @table[_hash][index + 1]
  end

  def show_distribution
    n = 0
    @table.each_with_index do |entry, i|
      if entry.length > 0
        n += entry.length / 2
        puts "#{i} #{entry}"
      end
    end
    n
  end

end

data = %w(David David Jennifer Donnie Raymond Cynthia Mike Clayton Danny Jonathan)


hashTable = HashTableSeparateChaining.new(11)

data.each { |name| hashTable.put(name, name) }
data.each { |name| puts "key: #{name}: #{hashTable.get(name)}" }


distribution_length = hashTable.show_distribution

puts "data_length: #{data.count}, distribution_length: #{distribution_length}"





