const chai				= require("chai");
const chaiAsPromised	= require('chai-as-promised');
chai.use(chaiAsPromised);
const expect			= chai.expect;
const sinon				= require('sinon');
const OrderListUsersEvent	= require("../../build/Order/OrderListUsersEvent");


describe("OrderListUsersEvent", function() {
	describe("say '/listUsersEvent event'", function() {
		it("listed", function(done) {
			//prepare
			const userSave = sinon.spy();
			const user = {
				username: "user",
				userid: 42,
				roll: 'jefazo',
				save: userSave
			};

			const event ={
				name: "event",
				getUsers: sinon.stub().returns(new Promise((resolve,reject) => resolve([user, user, user])))
			};

			const reforest = {
				_sendMessage: sinon.spy()
			}
			const myfindUser = sinon.stub();
			myfindUser.withArgs({where:{username: "username"}}).returns(new Promise((resolve,reject) => resolve(user)));
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
			const order = new OrderListUsersEvent(db, reforest);
			
			order.execute({
				chat: {id: 42},
				from: {username: "username"},
				text: "/listUsersEvent event"
			}).then(function(){
				expect(reforest._sendMessage.callCount).to.be.equal(1);
				done();
			})
		});
	});
});