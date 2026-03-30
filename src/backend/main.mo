import Map "mo:core/Map";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";

actor {
  public type Coordinates = (Float, Float);

  public type ParameterReading = {
    currentValue : Float;
    unit : Text;
    historicalTrend : [Float];
  };

  public type StationData = {
    name : Text;
    locationDescription : Text;
    coordinates : Coordinates;
    dissolvedOxygen : ParameterReading;
    pH : ParameterReading;
    turbidity : ParameterReading;
    temperature : ParameterReading;
    nitrates : ParameterReading;
    ecoli : ParameterReading;
    flowRate : ParameterReading;
    macroinvertebrateIndex : ParameterReading;
  };

  module StationData {
    public func compare(data1 : StationData, data2 : StationData) : Order.Order {
      Text.compare(data1.name, data2.name);
    };
  };

  let stations = Map.empty<Text, StationData>();

  // Helper function to create initial ParameterReading
  func createParameterReading(currentValue : Float, unit : Text, historicalTrend : [Float]) : ParameterReading {
    {
      currentValue;
      unit;
      historicalTrend;
    };
  };

  // Helper function to create a station
  func createStation(name : Text, locationDescription : Text, coordinates : Coordinates, dissolvedOxygen : ParameterReading, pH : ParameterReading, turbidity : ParameterReading, temperature : ParameterReading, nitrates : ParameterReading, ecoli : ParameterReading, flowRate : ParameterReading, macroinvertebrateIndex : ParameterReading) : StationData {
    {
      name;
      locationDescription;
      coordinates;
      dissolvedOxygen;
      pH;
      turbidity;
      temperature;
      nitrates;
      ecoli;
      flowRate;
      macroinvertebrateIndex;
    };
  };

  let headwaters = createStation(
    "Headwaters",
    "Source of the river in the mountains",
    (0.0, 0.0),
    createParameterReading(9.5, "mg/L", [9.7, 9.6, 9.5, 9.4, 9.6, 9.5]),
    createParameterReading(7.2, "pH", [7.3, 7.2, 7.1, 7.2, 7.3, 7.2]),
    createParameterReading(2.0, "NTU", [2.1, 2.0, 2.2, 2.1, 2.0, 2.0]),
    createParameterReading(12.0, "°C", [11.8, 11.9, 12.0, 12.1, 12.0, 12.0]),
    createParameterReading(0.8, "mg/L", [0.9, 0.8, 0.7, 0.8, 0.9, 0.8]),
    createParameterReading(100.0, "CFU/100mL", [110.0, 105.0, 100.0, 98.0, 102.0, 100.0]),
    createParameterReading(1.5, "m/s", [1.6, 1.5, 1.4, 1.5, 1.6, 1.5]),
    createParameterReading(9.0, "Index", [9.2, 9.1, 9.0, 8.9, 9.1, 9.0])
  );

  let upperReach = createStation(
    "Upper Reach",
    "First 10km downstream",
    (10.0, 20.0),
    createParameterReading(8.0, "mg/L", [8.2, 8.1, 8.0, 7.9, 8.1, 8.0]),
    createParameterReading(7.1, "pH", [7.0, 7.1, 7.2, 7.1, 7.0, 7.1]),
    createParameterReading(4.0, "NTU", [4.1, 4.0, 3.9, 4.1, 4.0, 4.0]),
    createParameterReading(13.5, "°C", [13.3, 13.2, 13.5, 13.7, 13.5, 13.5]),
    createParameterReading(1.5, "mg/L", [1.6, 1.5, 1.4, 1.5, 1.6, 1.5]),
    createParameterReading(180.0, "CFU/100mL", [190.0, 185.0, 180.0, 178.0, 182.0, 180.0]),
    createParameterReading(1.3, "m/s", [1.4, 1.3, 1.2, 1.3, 1.4, 1.3]),
    createParameterReading(7.5, "Index", [7.6, 7.6, 7.5, 7.5, 7.7, 7.5])
  );

  let midReach = createStation(
    "Mid Reach",
    "Transition to agricultural/urban areas",
    (25.0, 45.0),
    createParameterReading(7.0, "mg/L", [7.1, 7.2, 7.0, 7.0, 7.1, 7.0]),
    createParameterReading(7.0, "pH", [7.1, 7.0, 6.9, 7.0, 7.1, 7.0]),
    createParameterReading(7.0, "NTU", [6.9, 7.0, 7.1, 7.0, 6.9, 7.0]),
    createParameterReading(16.0, "°C", [15.8, 15.7, 16.0, 16.2, 16.1, 16.0]),
    createParameterReading(2.8, "mg/L", [2.9, 2.8, 2.7, 2.8, 2.9, 2.8]),
    createParameterReading(350.0, "CFU/100mL", [360.0, 355.0, 350.0, 348.0, 352.0, 350.0]),
    createParameterReading(1.1, "m/s", [1.2, 1.1, 1.0, 1.1, 1.2, 1.1]),
    createParameterReading(5.0, "Index", [5.2, 5.1, 5.0, 4.9, 5.1, 5.0])
  );

  let lowerReach = createStation(
    "Lower Reach",
    "Widest segment of river",
    (40.0, 80.0),
    createParameterReading(6.0, "mg/L", [6.2, 6.1, 6.0, 5.9, 6.1, 6.0]),
    createParameterReading(6.9, "pH", [6.8, 6.9, 7.0, 6.9, 6.8, 6.9]),
    createParameterReading(12.0, "NTU", [12.1, 12.0, 11.9, 12.1, 12.0, 12.0]),
    createParameterReading(19.0, "°C", [18.8, 18.7, 19.0, 19.2, 19.1, 19.0]),
    createParameterReading(3.4, "mg/L", [3.5, 3.4, 3.3, 3.4, 3.5, 3.4]),
    createParameterReading(500.0, "CFU/100mL", [510.0, 505.0, 500.0, 498.0, 502.0, 500.0]),
    createParameterReading(0.9, "m/s", [1.0, 0.9, 0.8, 0.9, 1.0, 0.9]),
    createParameterReading(3.0, "Index", [3.2, 3.1, 3.0, 2.9, 3.1, 3.0])
  );

  let estuary = createStation(
    "Estuary",
    "Brackish, tidal mouth of river",
    (60.0, 100.0),
    createParameterReading(5.5, "mg/L", [5.6, 5.7, 5.5, 5.6, 5.7, 5.5]),
    createParameterReading(7.6, "pH", [7.5, 7.6, 7.7, 7.6, 7.5, 7.6]),
    createParameterReading(16.0, "NTU", [16.1, 16.0, 15.9, 16.1, 16.0, 16.0]),
    createParameterReading(21.0, "°C", [20.8, 20.7, 21.0, 21.2, 21.1, 21.0]),
    createParameterReading(4.2, "mg/L", [4.3, 4.2, 4.1, 4.2, 4.3, 4.2]),
    createParameterReading(700.0, "CFU/100mL", [710.0, 705.0, 700.0, 698.0, 702.0, 700.0]),
    createParameterReading(0.7, "m/s", [0.8, 0.7, 0.6, 0.7, 0.8, 0.7]),
    createParameterReading(2.0, "Index", [2.2, 2.1, 2.0, 1.9, 2.1, 2.0])
  );

  stations.add("Headwaters", headwaters);
  stations.add("Upper Reach", upperReach);
  stations.add("Mid Reach", midReach);
  stations.add("Lower Reach", lowerReach);
  stations.add("Estuary", estuary);

  public query ({ caller }) func getAllStations() : async [StationData] {
    stations.values().toArray().sort();
  };

  public query ({ caller }) func getStationReadings(stationName : Text) : async StationData {
    switch (stations.get(stationName)) {
      case (null) { Runtime.trap("Station not found") };
      case (?station) { station };
    };
  };
};
