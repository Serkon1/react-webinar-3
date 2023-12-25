import addCommentToTree from './index';

describe('treeToList', () => {
  test('test1', () => {
    const commentsTree = []
    const comment = {
      _id: "65845e159ae5c63ef0cadcf7",
      text: "",
      dateCreate: "2023-12-21T15:47:33.813Z",
      author: {
        profile: {
          name: "User №70"
        },
        _id: "65817be05c295a2ff2fcc5c7"
      },
      parent: {
        _id: "6582cc8626a7b477ef02856a",
        _type: "comment"
      },
      isDeleted: false,
      children: []
    };
    const articleId = "65817bed5c295a2ff2fcd182"

    expect(addCommentToTree(commentsTree, comment, articleId)).toEqual([
      {
        _id: "65845e159ae5c63ef0cadcf7",
        text: "",
        dateCreate: "2023-12-21T15:47:33.813Z",
        author: {
          profile: {
            name: "User №70"
          },
          _id: "65817be05c295a2ff2fcc5c7"
        },
        parent: {
          _id: "6582cc8626a7b477ef02856a",
          _type: "comment"
        },
        isDeleted: false,
        children: []
      }
    ]);
  });
  test('test2', () => {
    const commentsTree = [
      {
        _id: "6584138ebf82ef2ffe0ad6cb",
        text: "ss",
        dateCreate: "2023-12-21T10:29:34.007Z",
        author: {
          profile: {
            name: "User №8"
          },
          _id: "65817be05c295a2ff2fcc589"
        },
        parent: {
          _id: "65817bed5c295a2ff2fcd182",
          _type: "article"
        },
        isDeleted: false,
        children: [
          {
            _id: "658413edbf82ef2ffe0ad6f6",
            text: "sss",
            dateCreate: "2023-12-21T10:31:09.379Z",
            author: {
              profile: {
                name: "User №8"
              },
              _id: "65817be05c295a2ff2fcc589"
            },
            parent: {
              _id: "6584138ebf82ef2ffe0ad6cb",
              _type: "comment"
            },
            isDeleted: false,
            children: []
          },
        ]
      },
      {
        _id: "65842ce99ae5c63ef0cabd8e",
        text: "1",
        dateCreate: "2023-12-21T12:17:45.549Z",
        author: {
          profile: {
            name: "User №1"
          },
          _id: "65817be05c295a2ff2fcc582"
        },
        parent: {
          _id: "65817bed5c295a2ff2fcd182",
          _type: "article"
        },
        isDeleted: false,
        children: []
      }
    ]

    const comment = {
      _id: "65845e159ae5c63ef0cadcf7",
      text: "",
      dateCreate: "2023-12-21T15:47:33.813Z",
      author: {
        profile: {
          name: "User №70"
        },
        _id: "65817be05c295a2ff2fcc5c7"
      },
      parent: {
        _id: "658413edbf82ef2ffe0ad6f6",
        _type: "comment"
      },
      isDeleted: false,
      children: []
    };

    const articleId = "65817bed5c295a2ff2fcd182"

    expect(addCommentToTree(commentsTree, comment, articleId)).toEqual([{
      _id: "6584138ebf82ef2ffe0ad6cb",
      text: "ss",
      dateCreate: "2023-12-21T10:29:34.007Z",
      author: {
        profile: {
          name: "User №8"
        },
        _id: "65817be05c295a2ff2fcc589"
      },
      parent: {
        _id: "65817bed5c295a2ff2fcd182",
        _type: "article"
      },
      isDeleted: false,
      children: [
        {
          _id: "658413edbf82ef2ffe0ad6f6",
          text: "sss",
          dateCreate: "2023-12-21T10:31:09.379Z",
          author: {
            profile: {
              name: "User №8"
            },
            _id: "65817be05c295a2ff2fcc589"
          },
          parent: {
            _id: "6584138ebf82ef2ffe0ad6cb",
            _type: "comment"
          },
          isDeleted: false,
          children: [{
            _id: "65845e159ae5c63ef0cadcf7",
            text: "",
            dateCreate: "2023-12-21T15:47:33.813Z",
            author: {
              profile: {
                name: "User №70"
              },
              _id: "65817be05c295a2ff2fcc5c7"
            },
            parent: {
              _id: "658413edbf82ef2ffe0ad6f6",
              _type: "comment"
            },
            isDeleted: false,
            children: []
          }]
        },
      ]
    },
      {
        _id: "65842ce99ae5c63ef0cabd8e",
        text: "1",
        dateCreate: "2023-12-21T12:17:45.549Z",
        author: {
          profile: {
            name: "User №1"
          },
          _id: "65817be05c295a2ff2fcc582"
        },
        parent: {
          _id: "65817bed5c295a2ff2fcd182",
          _type: "article"
        },
        isDeleted: false,
        children: []
      }
    ]);
  });
});