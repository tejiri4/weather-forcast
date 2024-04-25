interface GeoJSONLDContext {
  '@version': string;
  wx: string;
  geo: string;
  unit: string;
  '@vocab': string;
}

interface GeoJSONLDContextArray extends Array<string | GeoJSONLDContext> {}

interface Coordinates extends Array<[number, number]> {}

interface Elevation {
  unitCode: string;
  value: number;
}

interface ProbabilityOfPrecipitation {
  unitCode: string;
  value: number | null;
}

interface Dewpoint {
  unitCode: string;
  value: number;
}

interface RelativeHumidity {
  unitCode: string;
  value: number;
}

interface Period {
  number: number;
  name: string;
  startTime: string;
  endTime: string;
  isDaytime: boolean;
  temperature: number;
  temperatureUnit: string;
  temperatureTrend: null;
  probabilityOfPrecipitation: ProbabilityOfPrecipitation;
  dewpoint: Dewpoint;
  relativeHumidity: RelativeHumidity;
  windSpeed: string;
  windDirection: string;
  icon: string;
  shortForecast: string;
  detailedForecast: string;
}

interface Properties {
  updated: string;
  units: string;
  forecastGenerator: string;
  generatedAt: string;
  updateTime: string;
  validTimes: string;
  elevation: Elevation;
  periods: Period[];
}

interface Geometry {
  type: string;
  coordinates: Coordinates[];
}

export interface Feature {
  '@context': GeoJSONLDContextArray;
  type: string;
  geometry: Geometry;
  properties: Properties;
}
