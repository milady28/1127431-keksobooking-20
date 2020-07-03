window.const = (function () {
  return {
    TYPE_ARRAY: ['palace', 'flat', 'house', 'bungalo'],
    TIME_ARRAY: ['12:00', '13:00', '14:00'],
    FEATURES_ARRAY: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    WIDTH_MAP: 947.5,
    WIDTH_MAP_PIN: 62,
    HEIGHT_MAP_PIN: 62,
    HEIGHT_OFFSET: 22,
    CHOICES: {
      '1': ['1'],
      '2': ['1', '2'],
      '3': ['1', '2', '3'],
      '100': ['0'],
    },
    MIN_PRICE: {
      'bungalo': '0',
      'flat': '1000',
      'house': '5000',
      'palace': '10000',
    }
  }
});