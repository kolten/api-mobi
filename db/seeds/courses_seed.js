
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('courses').del()
    .then(function () {
      // Inserts seed entries
      return knex('courses').insert([
        // Title of course
        // Static image src
        // Github url
        // YouTube id
        {title: 'Learn Node.js', img_url: "", github_url: "", playlist_id: ""},
        {title: 'Intro to React', img_url: "", github_url: "", playlist_id: ""},
        {title: 'Android Snapchat Clone!', img_url: "", github_url: "", playlist_id: ""},
      ]);
    });
};
