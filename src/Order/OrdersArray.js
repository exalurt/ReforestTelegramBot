let orders = new Map();
orders.set("addUserEvent",    './Order/OrderAddUserEvent');
orders.set("createEvent",     './Order/OrderCreateEvent');
orders.set("createUser",      './Order/OrderCreateUser');
orders.set("deleteEvent",     './Order/OrderDeleteEvent');
orders.set("deleteUser",      './Order/OrderDeleteUser');
orders.set("help",            './Order/OrderHelp');
orders.set("listEvents",      './Order/OrderListEvent');
orders.set("listUsers",       './Order/OrderList');
orders.set("listUserEvent",   './Order/OrderListUsersEvent');
orders.set("removeUserEvent", './Order/OrderRemoveUserEvent');
orders.set("setUser",         './Order/OrderSetUser');
orders.set("sendImage",       './Order/OrderSendImage');


module.exports = orders;