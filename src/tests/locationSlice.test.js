import * as slice from "../features/locations/locationSlice";

test("intial filter selector works", () => {
  const location_state = {
    location: {
      locations: [],
      categories: [],
      loading: true,
      error: null,
      filters: {
        max_distance: null,
        contains_text: null,
        categories: [],
      },
      initial_map_center: [53.511435, -113.496548],
      initial_map_zoom: [11.25],
      initial_map_pitch: [50],
      current_user_location: null,
    },
  };
  let filter = slice.allFilterSelector(location_state);

  expect(filter).toStrictEqual({
    max_distance: null,
    contains_text: null,
    categories: [],
  });
});

test("get initial user location", () => {
  const location_state = {
    location: {
      locations: [],
      categories: [],
      loading: true,
      error: null,
      filters: {
        max_distance: null,
        contains_text: null,
        categories: [],
      },
      initial_map_center: [53.511435, -113.496548],
      initial_map_zoom: [11.25],
      initial_map_pitch: [50],
      current_user_location: null,
    },
  };
  let location = slice.userLocationSelector(location_state);

  expect(location).toStrictEqual([53.511435, -113.496548]);
});

test("get user location", () => {
  const location_state = {
    location: {
      locations: [],
      categories: [],
      loading: true,
      error: null,
      filters: {
        max_distance: null,
        contains_text: null,
        categories: [],
      },
      initial_map_center: [53.511435, -113.496548],
      initial_map_zoom: [11.25],
      initial_map_pitch: [50],
      current_user_location: [0, 0],
    },
  };
  let location = slice.userLocationSelector(location_state);

  expect(location).toStrictEqual([0, 0]);
});

test("get all locations", () => {
  const location_state = {
    location: {
      locations: [
        {
          title: "Belgravia Benches",
          description:
            "THESE BENCHES ARE ABSOLUTELY FANTASTIC. Seriously you will fall in love with the vibes of this area once you visit. There are a hilariously excessive amount of benches (with a hidden one in the trees too), but they offer an amazing view. The benches overlook Fox Drive and the equestrian park plus you can see the Quesnell bridge. The view is facing the west, so go at sunset and you may actually cry. I would recommend pairing a trip to these benches with a End of the World visit if you haven\u2019t been because they are 3 minutes apart walking. Park on the street (Saskatchewan Drive) in the neighbourhood right next to it.",
          id: 7,
          category_id: 1,
          media: [
            {
              type: "image",
              url: "01ef19c9-372e-4bd4-8081-ea1afb730e1a.jpg",
            },
            {
              type: "image",
              url: "eb8bfb10-e2b8-47bd-8925-5318fb7cf10d.jpg",
            },
            {
              type: "image",
              url: "ee21335f-c3ad-44c0-a2c9-1bcae1e744b8.jpg",
            },
          ],
          geo: {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [53.50625, -113.542297],
            },
          },
        },
        {
          title: "Talus Balls",
          description:
            "The Talus Balls are infamous for being expensive ($600 000), ugly, and being placed in an odd location. Although most Edmontonians hate this work of public art, it\u2019s worth checking out at least once. Some kids climb on top of them, which may get you in trouble, IDK. It\u2019s also possible to crawl to the inside of the balls (unless the hole has been filled in recently), also not advisable. It\u2019s worth it to check out the balls if you are exploring the Whitemud Half-Circles or underneath the Quesnell bridge too. Park underneath the Quesnell on Fort Edmonton Park Road in the little side area.",
          id: 8,
          category_id: 2,
          media: [
            {
              type: "image",
              url: "b6ecfe56-ced1-4510-b0e8-9e13cb6c2348.jpg",
            },
            {
              type: "image",
              url: "eb7babfe-5995-4711-9ae8-b47fc393941e.jpg",
            },
          ],
          geo: {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [53.50463, -113.565906],
            },
          },
        },
      ],
      categories: [
        {
          id: 1,
          name: "Places",
          color: "red",
        },
        {
          id: 2,
          name: "Views",
          color: "blue",
        },
      ],
      loading: true,
      error: null,
      filters: {
        max_distance: null,
        contains_text: null,
        categories: [],
      },
      initial_map_center: [53.511435, -113.496548],
      initial_map_zoom: [11.25],
      initial_map_pitch: [50],
      current_user_location: null,
    },
  };
  let locations = slice.allLocationsSelector(location_state);

  expect(locations).toStrictEqual([
    {
      title: "Belgravia Benches",
      description:
        "THESE BENCHES ARE ABSOLUTELY FANTASTIC. Seriously you will fall in love with the vibes of this area once you visit. There are a hilariously excessive amount of benches (with a hidden one in the trees too), but they offer an amazing view. The benches overlook Fox Drive and the equestrian park plus you can see the Quesnell bridge. The view is facing the west, so go at sunset and you may actually cry. I would recommend pairing a trip to these benches with a End of the World visit if you haven\u2019t been because they are 3 minutes apart walking. Park on the street (Saskatchewan Drive) in the neighbourhood right next to it.",
      id: 7,
      category_id: 1,
      media: [
        {
          type: "image",
          url: "01ef19c9-372e-4bd4-8081-ea1afb730e1a.jpg",
        },
        {
          type: "image",
          url: "eb8bfb10-e2b8-47bd-8925-5318fb7cf10d.jpg",
        },
        {
          type: "image",
          url: "ee21335f-c3ad-44c0-a2c9-1bcae1e744b8.jpg",
        },
      ],
      geo: {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [53.50625, -113.542297],
        },
      },
    },
    {
      title: "Talus Balls",
      description:
        "The Talus Balls are infamous for being expensive ($600 000), ugly, and being placed in an odd location. Although most Edmontonians hate this work of public art, it\u2019s worth checking out at least once. Some kids climb on top of them, which may get you in trouble, IDK. It\u2019s also possible to crawl to the inside of the balls (unless the hole has been filled in recently), also not advisable. It\u2019s worth it to check out the balls if you are exploring the Whitemud Half-Circles or underneath the Quesnell bridge too. Park underneath the Quesnell on Fort Edmonton Park Road in the little side area.",
      id: 8,
      category_id: 2,
      media: [
        {
          type: "image",
          url: "b6ecfe56-ced1-4510-b0e8-9e13cb6c2348.jpg",
        },
        {
          type: "image",
          url: "eb7babfe-5995-4711-9ae8-b47fc393941e.jpg",
        },
      ],
      geo: {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [53.50463, -113.565906],
        },
      },
    },
  ]);
});

test("get location geoJSON", () => {
  const location_state = {
    location: {
      locations: [
        {
          title: "Belgravia Benches",
          description:
            "THESE BENCHES ARE ABSOLUTELY FANTASTIC. Seriously you will fall in love with the vibes of this area once you visit. There are a hilariously excessive amount of benches (with a hidden one in the trees too), but they offer an amazing view. The benches overlook Fox Drive and the equestrian park plus you can see the Quesnell bridge. The view is facing the west, so go at sunset and you may actually cry. I would recommend pairing a trip to these benches with a End of the World visit if you haven\u2019t been because they are 3 minutes apart walking. Park on the street (Saskatchewan Drive) in the neighbourhood right next to it.",
          id: 7,
          category_id: 1,
          media: [
            {
              type: "image",
              url: "01ef19c9-372e-4bd4-8081-ea1afb730e1a.jpg",
            },
            {
              type: "image",
              url: "eb8bfb10-e2b8-47bd-8925-5318fb7cf10d.jpg",
            },
            {
              type: "image",
              url: "ee21335f-c3ad-44c0-a2c9-1bcae1e744b8.jpg",
            },
          ],
          geo: {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-113.542297, 53.50625],
            },
          },
        },
        {
          title: "Talus Balls",
          description:
            "The Talus Balls are infamous for being expensive ($600 000), ugly, and being placed in an odd location. Although most Edmontonians hate this work of public art, it\u2019s worth checking out at least once. Some kids climb on top of them, which may get you in trouble, IDK. It\u2019s also possible to crawl to the inside of the balls (unless the hole has been filled in recently), also not advisable. It\u2019s worth it to check out the balls if you are exploring the Whitemud Half-Circles or underneath the Quesnell bridge too. Park underneath the Quesnell on Fort Edmonton Park Road in the little side area.",
          id: 8,
          category_id: 2,
          media: [
            {
              type: "image",
              url: "b6ecfe56-ced1-4510-b0e8-9e13cb6c2348.jpg",
            },
            {
              type: "image",
              url: "eb7babfe-5995-4711-9ae8-b47fc393941e.jpg",
            },
          ],
          geo: {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-113.565906, 53.50463],
            },
          },
        },
      ],
      categories: [
        {
          id: 1,
          name: "Places",
          color: "red",
        },
        {
          id: 2,
          name: "Views",
          color: "blue",
        },
      ],
      loading: true,
      error: null,
      filters: {
        max_distance: null,
        contains_text: null,
        categories: [],
      },
      initial_map_center: [53.511435, -113.496548],
      initial_map_zoom: [11.25],
      initial_map_pitch: [50],
      current_user_location: null,
    },
  };
  let locations_geoJSON = slice.filteredLocationsAsGeoJSONSelector(
    location_state
  );
  console.log(JSON.stringify(locations_geoJSON, null, 2));
  // expect(locations_geoJSON).toStrictEqual([
  //     {
  //         "title": "Belgravia Benches",
  //         "description": "THESE BENCHES ARE ABSOLUTELY FANTASTIC. Seriously you will fall in love with the vibes of this area once you visit. There are a hilariously excessive amount of benches (with a hidden one in the trees too), but they offer an amazing view. The benches overlook Fox Drive and the equestrian park plus you can see the Quesnell bridge. The view is facing the west, so go at sunset and you may actually cry. I would recommend pairing a trip to these benches with a End of the World visit if you haven\u2019t been because they are 3 minutes apart walking. Park on the street (Saskatchewan Drive) in the neighbourhood right next to it.",
  //         "id": 7,
  //         "category_id": 1,
  //         "media": [
  //             {
  //                 "type": "image",
  //                 "url": "01ef19c9-372e-4bd4-8081-ea1afb730e1a.jpg"
  //             },
  //             {
  //                 "type": "image",
  //                 "url": "eb8bfb10-e2b8-47bd-8925-5318fb7cf10d.jpg"
  //             },
  //             {
  //                 "type": "image",
  //                 "url": "ee21335f-c3ad-44c0-a2c9-1bcae1e744b8.jpg"
  //             }
  //         ],
  //         "geo": {
  //             "type": "Feature",
  //             "geometry": {
  //                 "type": "Point",
  //                 "coordinates": [
  //                     53.50625000,
  //                     -113.54229700
  //                 ]
  //             }
  //         }
  //     },
  //     {
  //         "title": "Talus Balls",
  //         "description": "The Talus Balls are infamous for being expensive ($600 000), ugly, and being placed in an odd location. Although most Edmontonians hate this work of public art, it\u2019s worth checking out at least once. Some kids climb on top of them, which may get you in trouble, IDK. It\u2019s also possible to crawl to the inside of the balls (unless the hole has been filled in recently), also not advisable. It\u2019s worth it to check out the balls if you are exploring the Whitemud Half-Circles or underneath the Quesnell bridge too. Park underneath the Quesnell on Fort Edmonton Park Road in the little side area.",
  //         "id": 8,
  //         "category_id": 2,
  //         "media": [
  //             {
  //                 "type": "image",
  //                 "url": "b6ecfe56-ced1-4510-b0e8-9e13cb6c2348.jpg"
  //             },
  //             {
  //                 "type": "image",
  //                 "url": "eb7babfe-5995-4711-9ae8-b47fc393941e.jpg"
  //             }
  //         ],
  //         "geo": {
  //             "type": "Feature",
  //             "geometry": {
  //                 "type": "Point",
  //                 "coordinates": [
  //                     53.50463000,
  //                     -113.56590600
  //                 ]
  //             }
  //         }
  //     }
  // ])
});

test("get all locations with distances", () => {
  const location_state = {
    location: {
      locations: [
        {
          title: "Belgravia Benches",
          description:
            "THESE BENCHES ARE ABSOLUTELY FANTASTIC. Seriously you will fall in love with the vibes of this area once you visit. There are a hilariously excessive amount of benches (with a hidden one in the trees too), but they offer an amazing view. The benches overlook Fox Drive and the equestrian park plus you can see the Quesnell bridge. The view is facing the west, so go at sunset and you may actually cry. I would recommend pairing a trip to these benches with a End of the World visit if you haven\u2019t been because they are 3 minutes apart walking. Park on the street (Saskatchewan Drive) in the neighbourhood right next to it.",
          id: 7,
          category_id: 1,
          media: [
            {
              type: "image",
              url: "01ef19c9-372e-4bd4-8081-ea1afb730e1a.jpg",
            },
            {
              type: "image",
              url: "eb8bfb10-e2b8-47bd-8925-5318fb7cf10d.jpg",
            },
            {
              type: "image",
              url: "ee21335f-c3ad-44c0-a2c9-1bcae1e744b8.jpg",
            },
          ],
          geo: {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [53.50625, -113.542297],
            },
          },
        },
        {
          title: "Talus Balls",
          description:
            "The Talus Balls are infamous for being expensive ($600 000), ugly, and being placed in an odd location. Although most Edmontonians hate this work of public art, it\u2019s worth checking out at least once. Some kids climb on top of them, which may get you in trouble, IDK. It\u2019s also possible to crawl to the inside of the balls (unless the hole has been filled in recently), also not advisable. It\u2019s worth it to check out the balls if you are exploring the Whitemud Half-Circles or underneath the Quesnell bridge too. Park underneath the Quesnell on Fort Edmonton Park Road in the little side area.",
          id: 8,
          category_id: 2,
          media: [
            {
              type: "image",
              url: "b6ecfe56-ced1-4510-b0e8-9e13cb6c2348.jpg",
            },
            {
              type: "image",
              url: "eb7babfe-5995-4711-9ae8-b47fc393941e.jpg",
            },
          ],
          geo: {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [53.50463, -113.565906],
            },
          },
        },
      ],
      categories: [
        {
          id: 1,
          name: "Places",
          color: "red",
        },
        {
          id: 2,
          name: "Views",
          color: "blue",
        },
      ],
      loading: true,
      error: null,
      filters: {
        max_distance: null,
        contains_text: null,
        categories: [],
      },
      initial_map_center: [53.511435, -113.496548],
      initial_map_zoom: [11.25],
      initial_map_pitch: [50],
      current_user_location: null,
    },
  };
  let locations = slice.allLocationsWithDistanceSelector(location_state);

  expect(locations[0].distance).toBe(3.08);
  expect(locations[1].distance).toBe(4.65);
});

test("locations with distances are sorted", () => {
  const location_state = {
    location: {
      locations: [
        {
          title: "Talus Balls",
          description:
            "The Talus Balls are infamous for being expensive ($600 000), ugly, and being placed in an odd location. Although most Edmontonians hate this work of public art, it\u2019s worth checking out at least once. Some kids climb on top of them, which may get you in trouble, IDK. It\u2019s also possible to crawl to the inside of the balls (unless the hole has been filled in recently), also not advisable. It\u2019s worth it to check out the balls if you are exploring the Whitemud Half-Circles or underneath the Quesnell bridge too. Park underneath the Quesnell on Fort Edmonton Park Road in the little side area.",
          id: 8,
          category_id: 2,
          media: [
            {
              type: "image",
              url: "b6ecfe56-ced1-4510-b0e8-9e13cb6c2348.jpg",
            },
            {
              type: "image",
              url: "eb7babfe-5995-4711-9ae8-b47fc393941e.jpg",
            },
          ],
          geo: {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [53.50463, -113.565906],
            },
          },
        },
        {
          title: "Belgravia Benches",
          description:
            "THESE BENCHES ARE ABSOLUTELY FANTASTIC. Seriously you will fall in love with the vibes of this area once you visit. There are a hilariously excessive amount of benches (with a hidden one in the trees too), but they offer an amazing view. The benches overlook Fox Drive and the equestrian park plus you can see the Quesnell bridge. The view is facing the west, so go at sunset and you may actually cry. I would recommend pairing a trip to these benches with a End of the World visit if you haven\u2019t been because they are 3 minutes apart walking. Park on the street (Saskatchewan Drive) in the neighbourhood right next to it.",
          id: 7,
          category_id: 1,
          media: [
            {
              type: "image",
              url: "01ef19c9-372e-4bd4-8081-ea1afb730e1a.jpg",
            },
            {
              type: "image",
              url: "eb8bfb10-e2b8-47bd-8925-5318fb7cf10d.jpg",
            },
            {
              type: "image",
              url: "ee21335f-c3ad-44c0-a2c9-1bcae1e744b8.jpg",
            },
          ],
          geo: {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [53.50625, -113.542297],
            },
          },
        },
      ],
      categories: [
        {
          id: 1,
          name: "Places",
          color: "red",
        },
        {
          id: 2,
          name: "Views",
          color: "blue",
        },
      ],
      loading: true,
      error: null,
      filters: {
        max_distance: null,
        contains_text: null,
        categories: [],
      },
      initial_map_center: [53.511435, -113.496548],
      initial_map_zoom: [11.25],
      initial_map_pitch: [50],
      current_user_location: null,
    },
  };
  let locations = slice.allLocationsWithDistanceSelector(location_state);

  expect(locations[0].distance).toBe(3.08);
  expect(locations[1].distance).toBe(4.65);
});

test("text filter", () => {
  const location_state = {
    location: {
      locations: [
        {
          title: "Belgravia Benches",
          description:
            "THESE BENCHES ARE ABSOLUTELY FANTASTIC. Seriously you will fall in love with the vibes of this area once you visit. There are a hilariously excessive amount of benches (with a hidden one in the trees too), but they offer an amazing view. The benches overlook Fox Drive and the equestrian park plus you can see the Quesnell bridge. The view is facing the west, so go at sunset and you may actually cry. I would recommend pairing a trip to these benches with a End of the World visit if you haven\u2019t been because they are 3 minutes apart walking. Park on the street (Saskatchewan Drive) in the neighbourhood right next to it.",
          id: 7,
          category_id: 1,
          media: [
            {
              type: "image",
              url: "01ef19c9-372e-4bd4-8081-ea1afb730e1a.jpg",
            },
            {
              type: "image",
              url: "eb8bfb10-e2b8-47bd-8925-5318fb7cf10d.jpg",
            },
            {
              type: "image",
              url: "ee21335f-c3ad-44c0-a2c9-1bcae1e744b8.jpg",
            },
          ],
          geo: {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [53.50625, -113.542297],
            },
          },
        },
        {
          title: "Talus Balls",
          description:
            "The Talus Balls are infamous for being expensive ($600 000), ugly, and being placed in an odd location. Although most Edmontonians hate this work of public art, it\u2019s worth checking out at least once. Some kids climb on top of them, which may get you in trouble, IDK. It\u2019s also possible to crawl to the inside of the balls (unless the hole has been filled in recently), also not advisable. It\u2019s worth it to check out the balls if you are exploring the Whitemud Half-Circles or underneath the Quesnell bridge too. Park underneath the Quesnell on Fort Edmonton Park Road in the little side area.",
          id: 8,
          category_id: 2,
          media: [
            {
              type: "image",
              url: "b6ecfe56-ced1-4510-b0e8-9e13cb6c2348.jpg",
            },
            {
              type: "image",
              url: "eb7babfe-5995-4711-9ae8-b47fc393941e.jpg",
            },
          ],
          geo: {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [53.50463, -113.565906],
            },
          },
        },
      ],
      categories: [
        {
          id: 1,
          name: "Places",
          color: "red",
        },
        {
          id: 2,
          name: "Views",
          color: "blue",
        },
      ],
      loading: true,
      error: null,
      filters: {
        max_distance: null,
        contains_text: "benches",
        categories: [],
      },
      initial_map_center: [53.511435, -113.496548],
      initial_map_zoom: [11.25],
      initial_map_pitch: [50],
      current_user_location: null,
    },
  };
  let locations = slice.filteredLocationsSelector(location_state);

  expect(locations).toStrictEqual([
    {
      title: "Belgravia Benches",
      description:
        "THESE BENCHES ARE ABSOLUTELY FANTASTIC. Seriously you will fall in love with the vibes of this area once you visit. There are a hilariously excessive amount of benches (with a hidden one in the trees too), but they offer an amazing view. The benches overlook Fox Drive and the equestrian park plus you can see the Quesnell bridge. The view is facing the west, so go at sunset and you may actually cry. I would recommend pairing a trip to these benches with a End of the World visit if you haven\u2019t been because they are 3 minutes apart walking. Park on the street (Saskatchewan Drive) in the neighbourhood right next to it.",
      id: 7,
      category_id: 1,
      distance: 3.08,
      media: [
        {
          type: "image",
          url: "01ef19c9-372e-4bd4-8081-ea1afb730e1a.jpg",
        },
        {
          type: "image",
          url: "eb8bfb10-e2b8-47bd-8925-5318fb7cf10d.jpg",
        },
        {
          type: "image",
          url: "ee21335f-c3ad-44c0-a2c9-1bcae1e744b8.jpg",
        },
      ],
      geo: {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [53.50625, -113.542297],
        },
      },
    },
  ]);
});

test("distance filter", () => {
  const location_state = {
    location: {
      locations: [
        {
          title: "Belgravia Benches",
          description:
            "THESE BENCHES ARE ABSOLUTELY FANTASTIC. Seriously you will fall in love with the vibes of this area once you visit. There are a hilariously excessive amount of benches (with a hidden one in the trees too), but they offer an amazing view. The benches overlook Fox Drive and the equestrian park plus you can see the Quesnell bridge. The view is facing the west, so go at sunset and you may actually cry. I would recommend pairing a trip to these benches with a End of the World visit if you haven\u2019t been because they are 3 minutes apart walking. Park on the street (Saskatchewan Drive) in the neighbourhood right next to it.",
          id: 7,
          category_id: 1,
          media: [
            {
              type: "image",
              url: "01ef19c9-372e-4bd4-8081-ea1afb730e1a.jpg",
            },
            {
              type: "image",
              url: "eb8bfb10-e2b8-47bd-8925-5318fb7cf10d.jpg",
            },
            {
              type: "image",
              url: "ee21335f-c3ad-44c0-a2c9-1bcae1e744b8.jpg",
            },
          ],
          geo: {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [53.50625, -113.542297],
            },
          },
        },
        {
          title: "Talus Balls",
          description:
            "The Talus Balls are infamous for being expensive ($600 000), ugly, and being placed in an odd location. Although most Edmontonians hate this work of public art, it\u2019s worth checking out at least once. Some kids climb on top of them, which may get you in trouble, IDK. It\u2019s also possible to crawl to the inside of the balls (unless the hole has been filled in recently), also not advisable. It\u2019s worth it to check out the balls if you are exploring the Whitemud Half-Circles or underneath the Quesnell bridge too. Park underneath the Quesnell on Fort Edmonton Park Road in the little side area.",
          id: 8,
          category_id: 2,
          media: [
            {
              type: "image",
              url: "b6ecfe56-ced1-4510-b0e8-9e13cb6c2348.jpg",
            },
            {
              type: "image",
              url: "eb7babfe-5995-4711-9ae8-b47fc393941e.jpg",
            },
          ],
          geo: {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [53.50463, -113.565906],
            },
          },
        },
      ],
      categories: [
        {
          id: 1,
          name: "Places",
          color: "red",
        },
        {
          id: 2,
          name: "Views",
          color: "blue",
        },
      ],
      loading: true,
      error: null,
      filters: {
        max_distance: 4,
        contains_text: null,
        categories: [],
      },
      initial_map_center: [53.511435, -113.496548],
      initial_map_zoom: [11.25],
      initial_map_pitch: [50],
      current_user_location: null,
    },
  };
  let locations = slice.filteredLocationsSelector(location_state);

  expect(locations).toStrictEqual([
    {
      title: "Belgravia Benches",
      description:
        "THESE BENCHES ARE ABSOLUTELY FANTASTIC. Seriously you will fall in love with the vibes of this area once you visit. There are a hilariously excessive amount of benches (with a hidden one in the trees too), but they offer an amazing view. The benches overlook Fox Drive and the equestrian park plus you can see the Quesnell bridge. The view is facing the west, so go at sunset and you may actually cry. I would recommend pairing a trip to these benches with a End of the World visit if you haven\u2019t been because they are 3 minutes apart walking. Park on the street (Saskatchewan Drive) in the neighbourhood right next to it.",
      id: 7,
      category_id: 1,
      distance: 3.08,
      media: [
        {
          type: "image",
          url: "01ef19c9-372e-4bd4-8081-ea1afb730e1a.jpg",
        },
        {
          type: "image",
          url: "eb8bfb10-e2b8-47bd-8925-5318fb7cf10d.jpg",
        },
        {
          type: "image",
          url: "ee21335f-c3ad-44c0-a2c9-1bcae1e744b8.jpg",
        },
      ],
      geo: {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [53.50625, -113.542297],
        },
      },
    },
  ]);
});

test("category filter", () => {
  const location_state = {
    location: {
      locations: [
        {
          title: "Belgravia Benches",
          description:
            "THESE BENCHES ARE ABSOLUTELY FANTASTIC. Seriously you will fall in love with the vibes of this area once you visit. There are a hilariously excessive amount of benches (with a hidden one in the trees too), but they offer an amazing view. The benches overlook Fox Drive and the equestrian park plus you can see the Quesnell bridge. The view is facing the west, so go at sunset and you may actually cry. I would recommend pairing a trip to these benches with a End of the World visit if you haven\u2019t been because they are 3 minutes apart walking. Park on the street (Saskatchewan Drive) in the neighbourhood right next to it.",
          id: 7,
          category_id: 1,
          media: [
            {
              type: "image",
              url: "01ef19c9-372e-4bd4-8081-ea1afb730e1a.jpg",
            },
            {
              type: "image",
              url: "eb8bfb10-e2b8-47bd-8925-5318fb7cf10d.jpg",
            },
            {
              type: "image",
              url: "ee21335f-c3ad-44c0-a2c9-1bcae1e744b8.jpg",
            },
          ],
          geo: {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [53.50625, -113.542297],
            },
          },
        },
        {
          title: "Talus Balls",
          description:
            "The Talus Balls are infamous for being expensive ($600 000), ugly, and being placed in an odd location. Although most Edmontonians hate this work of public art, it\u2019s worth checking out at least once. Some kids climb on top of them, which may get you in trouble, IDK. It\u2019s also possible to crawl to the inside of the balls (unless the hole has been filled in recently), also not advisable. It\u2019s worth it to check out the balls if you are exploring the Whitemud Half-Circles or underneath the Quesnell bridge too. Park underneath the Quesnell on Fort Edmonton Park Road in the little side area.",
          id: 8,
          category_id: 2,
          media: [
            {
              type: "image",
              url: "b6ecfe56-ced1-4510-b0e8-9e13cb6c2348.jpg",
            },
            {
              type: "image",
              url: "eb7babfe-5995-4711-9ae8-b47fc393941e.jpg",
            },
          ],
          geo: {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [53.50463, -113.565906],
            },
          },
        },
      ],
      categories: [
        {
          id: 1,
          name: "Places",
          color: "red",
        },
        {
          id: 2,
          name: "Views",
          color: "blue",
        },
      ],
      loading: true,
      error: null,
      filters: {
        max_distance: null,
        contains_text: null,
        categories: [1],
      },
      initial_map_center: [53.511435, -113.496548],
      initial_map_zoom: [11.25],
      initial_map_pitch: [50],
      current_user_location: null,
    },
  };
  let locations = slice.filteredLocationsSelector(location_state);

  expect(locations).toStrictEqual([
    {
      title: "Belgravia Benches",
      description:
        "THESE BENCHES ARE ABSOLUTELY FANTASTIC. Seriously you will fall in love with the vibes of this area once you visit. There are a hilariously excessive amount of benches (with a hidden one in the trees too), but they offer an amazing view. The benches overlook Fox Drive and the equestrian park plus you can see the Quesnell bridge. The view is facing the west, so go at sunset and you may actually cry. I would recommend pairing a trip to these benches with a End of the World visit if you haven\u2019t been because they are 3 minutes apart walking. Park on the street (Saskatchewan Drive) in the neighbourhood right next to it.",
      id: 7,
      category_id: 1,
      distance: 3.08,
      media: [
        {
          type: "image",
          url: "01ef19c9-372e-4bd4-8081-ea1afb730e1a.jpg",
        },
        {
          type: "image",
          url: "eb8bfb10-e2b8-47bd-8925-5318fb7cf10d.jpg",
        },
        {
          type: "image",
          url: "ee21335f-c3ad-44c0-a2c9-1bcae1e744b8.jpg",
        },
      ],
      geo: {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [53.50625, -113.542297],
        },
      },
    },
  ]);
});
