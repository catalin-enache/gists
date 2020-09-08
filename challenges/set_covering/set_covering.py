
states_needed = set(['mt', 'wa', 'or', 'id', 'nv', 'ut', 'ca', 'az'])
stations = {
    'kone': set(['id', 'nv', 'ut']),
    'ktwo': set(['wa', 'id', 'mt']),
    'kthree': set(['or', 'nv', 'ca']),
    'kfour': set(['nv', 'ut']),
    'kfive': set(['ca', 'az']),
}


# approximation using greedy algorithm
def min_stations(states_needed, stations):
    final_stations = set()
    while states_needed:
        best_station = None
        states_covered = set()
        for station, states_for_stations in stations.items():
            covered = states_needed & states_for_stations
            if covered > states_covered:
                states_covered = covered
                best_station = station
        states_needed -= states_covered
        final_stations.add(best_station)
    return final_stations


print(min_stations(states_needed, stations))

