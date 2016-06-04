const chai				= require("chai");
const chaiAsPromised	= require('chai-as-promised');
chai.use(chaiAsPromised);
const expect			= chai.expect;
const sinon				= require('sinon');
const OrderAddUserEvent	= require("../../build/Order/OrderAddUserEvent");


describe("OrderAddUserEvent", function() {
	describe("say '/addUserEvent event user1 user2 user3'", function() {
		it("add users", function(done) {
			//prepare
			const userSave = sinon.spy();
			const userAddEvent = sinon.spy();
			const user = {
				username: "user",
				userid: 42,
				roll: 'admin',
				save: userSave,
				addEvent: userAddEvent
			};
			const event = {
				name: "event"
			};

			const reforest = {
				_sendMessage: sinon.spy()
			}
			const myfindUser = sinon.stub();
			myfindUser.withArgs({where:{username: "username"}}).returns(new Promise((resolve,reject) => resolve(user)));
			myfindUser.withArgs({where:{username: "user1"}}).returns(new Promise((resolve,reject) => resolve(user)));
			myfindUser.withArgs({where:{username: "user2"}}).returns(new Promise((resolve,reject) => resolve(user)));
			myfindUser.withArgs({where:{username: "user3"}}).returns(new Promise((resolve,reject) => resolve(user)));

			const myfindEvent = sinon.stub();
			myfindEvent.withArgs({where:{name: "event"}}).returns(new Promise((resolve,reject) => resolve(event)));

			const db = {
				User:{
					find: myfindUser
				},
				Event:{
					find: myfindEvent
				}
			}
			const order = new OrderAddUserEvent(db, reforest);
			
			order.execute({
				chat: {id: 42},
				from: {username: "username"},
				text: "/addUserEvent event user1 user2 user3"
			}).then(function(){
				expect(reforest._sendMessage.callCount).to.be.equal(3);
				expect(userSave.callCount).to.be.equal(3);
				expect(userAddEvent.callCount).to.be.equal(3);
				done();
			})
		});

		it("event not exist", function(done) {
			//prepare
			const userSave = sinon.spy();
			const userAddEvent = sinon.spy();
			const user = {
				username: "user",
				userid: 42,
				roll: 'admin',
				save: userSave,
				addEvent: userAddEvent
			};
			const event = {
				name: "event"
			};

			const reforest = {
				_sendMessage: sinon.spy()
			}
			const myfindUser = sinon.stub();
			myfindUser.withArgs({where:{username: "username"}}).returns(new Promise((resolve,reject) => resolve(user)));
			myfindUser.withArgs({where:{username: "user1"}}).returns(new Promise((resolve,reject) => resolve(user)));
			myfindUser.withArgs({where:{username: "user2"}}).returns(new Promise((resolve,reject) => resolve(user)));
			myfindUser.withArgs({where:{username: "user3"}}).returns(new Promise((resolve,reject) => resolve(user)));

			const myfindEvent = sinon.stub();
			myfindEvent.withArgs({where:{name: "event"}}).returns(new Promise((resolve,reject) => resolve(null)));

			const db = {
				User:{
					find: myfindUser
				},
				Event:{
					find: myfindEvent
				}
			}
			const order = new OrderAddUserEvent(db, reforest);
			
			order.execute({
				chat: {id: 42},
				from: {username: "username"},
				text: "/addUserEvent event user1 user2 user3"
			}).then(function(){
				expect(reforest._sendMessage.callCount).to.be.equal(1);
				expect(userSave.callCount).to.be.equal(0);
				expect(userAddEvent.callCount).to.be.equal(0);
				done();
			})
		});



		it("user not exist", function(done) {
			//prepare
			const userSave = sinon.spy();
			const userAddEvent = sinon.spy();
			const user = {
				username: "user",
				userid: 42,
				roll: 'admin',
				save: userSave,
				addEvent: userAddEvent
			};
			const event = {
				name: "event"
			};

			const reforest = {
				_sendMessage: sinon.spy()
			}
			const myfindUser = sinon.stub();
			myfindUser.withArgs({where:{username: "username"}}).returns(new Promise((resolve,reject) => resolve(user)));
			myfindUser.withArgs({where:{username: "user1"}}).returns(new Promise((resolve,reject) => resolve(null)));
			myfindUser.withArgs({where:{username: "user2"}}).returns(new Promise((resolve,reject) => resolve(user)));
			myfindUser.withArgs({where:{username: "user3"}}).returns(new Promise((resolve,reject) => resolve(user)));

			const myfindEvent = sinon.stub();
			myfindEvent.withArgs({where:{name: "event"}}).returns(new Promise((resolve,reject) => resolve(event)));

			const db = {
				User:{
					find: myfindUser
				},
				Event:{
					find: myfindEvent
				}
			}
			const order = new OrderAddUserEvent(db, reforest);
			
			order.execute({
				chat: {id: 42},
				from: {username: "username"},
				text: "/addUserEvent event user1 user2 user3"
			}).then(function(){
				expect(reforest._sendMessage.callCount).to.be.equal(3);
				expect(userSave.callCount).to.be.equal(2);
				expect(userAddEvent.callCount).to.be.equal(2);
				done();
			})
		});
	});
});