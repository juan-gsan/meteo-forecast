import { CityRepo } from "./city.repo";
describe("Given a cityRepo", () => {
  let mockCityRepo: CityRepo;

  beforeEach(() => {
    mockCityRepo = new CityRepo("mockUrl");
  });

  describe("When getCity method is called", () => {
    test("Then it should get a city", async () => {
      const mockCityData = [{}];
      const expectedUrl = "mockUrl";

      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue({ results: mockCityData }),
      });

      const response = await mockCityRepo.getCity(expectedUrl);

      expect(global.fetch).toHaveBeenCalled();
      expect(response).toEqual({});
    });
  });
});
