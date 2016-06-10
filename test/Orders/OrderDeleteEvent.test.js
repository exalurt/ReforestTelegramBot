const chai				= require("chai");
const chaiAsPromised	= require('chai-as-promised');
chai.use(chaiAsPromised);
const expect			= chai.expect;
const sinon				= require('sinon');
const OrderDeleteEvent	= require("../../build/Order/OrderDeleteEvent");


describe("OrderCreateUser", function() {
	describe("say '/deleteEvent event'", function() {
		it("event deleted", function(done) {
			//prepare
			const userSave = sinon.spy();
			const user = {
				username: "user",
				userid: 42,
				roll: 'jefazo',
				save: userSave
			};

			const event = {
				destroy: sinon.spy()
			}

			const reforest = {
				_sendMessage: sinon.spy()
			}
			const myfindUser = sinon.stub();
			myfindUser.withArgs({where:{username: "username"}}).returns(new Promise((resolve,reject) => resolve(user)));

			const myfindEvent = sinon.stub().returns(new Promise((resolve,reject) => resolve(event)));

			const db = {
				User:{
					find: myfindUser,
				},
				Event:{
					find: myfindEvent
				}
			}
			const order = new OrderDeleteEvent(db, reforest);
			
			order.execute({
				chat: {id: 42},
				from: {username: "username"},
				text: "/deleteEvent event"
			}).then(function(){
				expect(reforest._sendMessage.callCount).to.be.equal(1);
				expect(event.destroy.callCount).to.be.equal(1);
				done();
			})
		});
	});
});