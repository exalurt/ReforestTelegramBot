const chai				= require("chai");
const chaiAsPromised	= require('chai-as-promised');
chai.use(chaiAsPromised);
const expect			= chai.expect;
const sinon				= require('sinon');
const OrderSetUser		= require("../../build/Order/OrderSetUser");


describe("OrderSetUser", function() {
	describe("say '(/setJefazo | /setAdmin | /setRaso) user1 user2 user3'", function() {
		it("listed", function(done) {
			//prepare
			const userSave = sinon.spy();
			const user = {
				username: "user",
				userid: 42,
				roll: 'jefazo',
				save: userSave,
			};

			const event ={
				name: "event"
			};

			const reforest = {
				_sendMessage: sinon.spy(),
				_sendLog: sinon.spy()
			}
			const myfindUser = sinon.stub();
			myfindUser.withArgs({where:{username: "username"}}).returns(new Promise((resolve,reject) => resolve(user)));
			myfindUser.withArgs({where:{username: "user1"}}).returns(new Promise((resolve,reject) => resolve(user)));
			myfindUser.withArgs({where:{username: "user2"}}).returns(new Promise((resolve,reject) => resolve(user)));
			myfindUser.withArgs({where:{username: "user3"}}).returns(new Promise((resolve,reject) => resolve(user)));

			const myfindEvent = sinon.stub();
			myfindEvent.withArgs({where:{name: "event"}}).returns(new Promise((resolve,reject) => resolve(event)));

			const myUpdateUser = sinon.spy();

			const db = {
				User:{
					find: myfindUser,
					update: myUpdateUser
				},
				Event:{
					find: myfindEvent
				}
			}
			const order = new OrderSetUser(db, reforest, 'raso');
			order.execute({
				chat: {id: 42},
				from: {username: "username"},
				text: "/setRaso user1 user2 user3"
			}).then(function(){
				expect(reforest._sendMessage.callCount).to.be.equal(0);
				expect(myUpdateUser.callCount).to.be.equal(1);
				done();
			})
		});
	});
});