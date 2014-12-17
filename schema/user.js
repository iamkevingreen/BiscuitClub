 Schema = {};

Schema.UserProfile = new SimpleSchema({
    name: {
        type: String,
        regEx: /^[a-zA-Z-]{2,25}$/
    },
    gender: {
        type: String,
        allowedValues: ['Male', 'Female']
    },
    bio: {
        type: String,
    },
    avatar: {
        type: String,
    }
});

Schema.User = new SimpleSchema({
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    username: {
        type: String,
    },
    createdAt: {
        type: Date
    },
    profile: {
        type: Schema.UserProfile,
    },
    roles: {
        type: Object,
        optional: true,
        blackbox: false
    },
    services: {
        type: Object,
        optional: true,
        blackbox: false
    }
});

Meteor.users.attachSchema(Schema.User);
