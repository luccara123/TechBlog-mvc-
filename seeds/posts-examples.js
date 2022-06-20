const { Post } = require('../models');

const postExamples = [{
        post_title: "Learn about Jquery",
        post_content: "djkkalsdjlaksjdasjdas;dk;asd asdjasldjaslkdjlasjd asldjasldjasjdlasjdd",
        user_id: 1
    },
    {
        post_title: "Everything you need to know about react",
        post_content: "jasdlkjaskldjaklsjdksadn sldjsalkdjas d asdjalsdjalsdjlasdjlasdjasld",
        user_id: 2
    },
    {
        post_title: "Git commands you need to know",
        post_content: "asdasdasdasdasdasdasdasndsandnaskldalskdnaksdmnkalsd",
        user_id: 3
    }
];

const seedPosts = () => Post.bulkCreate(postExamples);

module.exports = seedPosts;