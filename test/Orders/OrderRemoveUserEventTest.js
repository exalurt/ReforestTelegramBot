const chai					= require("chai");
const chaiAsPromised		= require('chai-as-promised');
chai.use(chaiAsPromised);
const expect				= chai.expect;
const sinon					= require('sinon');
const OrderRemoveUserEvent	= require("../../build/Order/OrderRemoveUserEvent");


describe("OrderRemoveUserEvent", function() {
	describe("say '/removeUsersEvent event user1 user2 user3'", function() {
		it("listed", function(done) {
			//prepare
			const userSave = sinon.spy();
			const userRemoveEvent = sinon.spy();
			const user = {
				username: "user",
				userid: 42,
				roll: 'jefazo',
				save: userSave,
				removeEvent: userRemoveEvent
			};

			const event ={
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
					find: myfindUser,
				},
				Event:{
					find: myfindEvent
				}
			}
			const order = new OrderRemoveUserEvent(db, reforest);
			
			order.execute({
				chat: {id: 42},
				from: {username: "username"},
				text: "/removeUsersEvent event user1 user2 user3"
			}).then(function(){
				expect(reforest._sendMessage.callCount).to.be.equal(3);
				expect(userSave.callCount).to.be.equal(3);
				expect(userRemoveEvent.callCount).to.be.equal(3);
				done();
			})
		});
	});
});