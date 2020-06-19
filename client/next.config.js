module.exports = {
    webpackDevMiddleware: config => {
        config.watchOptions.poll = 300;
        return config;
    },
    env: {
        STRIPE_KEY: 'pk_test_51GtL0JJ0X1QddHkV3OqNib02QA2dLNL6aZdIXl0xtL6l5M7tyvJvtMTT1MMN5Y8kBpEscWZ1kluWb9XhLsA9MM3100jH00ak6u'
    }
}