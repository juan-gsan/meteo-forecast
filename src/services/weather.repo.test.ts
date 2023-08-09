import { WeatherRepo } from "./weather.repo";
describe("Given a weatherRepo", () => {
  let mockWeatherRepo: WeatherRepo;

  beforeEach(() => {
    mockWeatherRepo = new WeatherRepo("mockUrl");
  });

  describe("When getWeatherByCity method is called", () => {
    test("Then it should get the weather", async () => {
      const mockWeatherData = {};

      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockWeatherData),
      });

      const response = await mockWeatherRepo.getWeatherByCity(
        "test",
        "test",
        "test"
      );

      expect(global.fetch).toHaveBeenCalled();
      expect(response).toEqual({});
    });
  });
});
