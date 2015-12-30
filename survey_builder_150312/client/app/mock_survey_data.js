var mockSurveyData = {
  id: 435,
  title: "ハリーポッタークイズ",
  description: "ハリーポッターのファンの皆さんに質問です。",
  createdAt: new Date(),
  updatedAt: new Date(),
  items: [{
    "id": 35,
    "type": "yes_no",
    "meta": {
      "label": "お気に入りの呪文がありますか？"
    }
  }, {
    "id": 36,
    "type": "yes_no",
    "meta": {
      "label": "お気に入りのキャラクターがいますか？"
    }
  }, {
    "id": 37,
    "type": "multiple_choice",
    "meta": {
      "label": "一番好きな魔法の道具は？",
      "choices": [
        "逆転時計",
        "憂いの篩",
        "移動キー"
      ]
    }
  }, {
    "id": 38,
    "type": "essay",
    "meta": {
      "label": "一番好きなエピソードは？またその理由は？"
    }
  }]
};

module.exports = mockSurveyData;
