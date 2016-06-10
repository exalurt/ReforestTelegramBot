const chai				= require("chai");
const chaiAsPromised	= require('chai-as-promised');
chai.use(chaiAsPromised);
const expect			= chai.expect;
const sinon				= require('sinon');
const OrderCreateEvent	= require("../../build/Order/OrderCreateEvent");


describe("OrderCreateEvent", function() {
	describe("say '/createEvent event 2016/06/01-10:00 2016/06/01-10:00'", function() {
		it("add event", function(done) {
			//prepare
			const userSave = sinon.spy();
			const user = {
				username: "user",
				userid: 42,
				roll: 'jefazo',
				save: userSave
			};

			const reforest = {
				_sendMessage: sinon.spy()
			}
			const myfindUser = sinon.stub();
			myfindUser.withArgs({where:{username: "username"}}).returns(new Promise((resolve,reject) => resolve(user)));

			const createEvent = sinon.spy();

			const db = {
				User:{
					find: myfindUser
				},
				Event:{
					create: createEvent
				}
			}
			const order = new OrderCreateEvent(db, reforest);
			
			order.execute({
				chat: {id: 42},
				from: {username: "username"},
				text: "/createEvent event 2016/06/01-10:00 2016/06/01-10:00"
			}).then(function(){
				expect(reforest._sendMessage.callCount).to.be.equal(1);
				expect(createEvent.callCount).to.be.equal(1);
				done();
			})
		});
	});

	describe("bad event", function() {
		it("say '/createEvent event 2016/06/01-10:00'", function() {
			//prepare
			const userSave = sinon.spy();
			const user = {
				username: "user",
				userid: 42,
				roll: 'jefazo',
				save: userSave
			};

			const reforest = {
				_sendMessage: sinon.spy()
			}
			const myfindUser = sinon.stub();
			myfindUser.withArgs({where:{username: "username"}}).returns(new Promise((resolve,reject) => resolve(user)));

			const createEvent = sinon.spy();

			const db = {
				User:{
					find: myfindUser
				},
				Event:{
					create: createEvent
				}
			}
			const order = new OrderCreateEvent(db, reforest);
			
			order.execute({
				chat: {id: 42},
				from: {username: "username"},
				text: "/createEvent event  2016/06/01-10:00"
			}).then(function(){
				expect(reforest._sendMessage.callCount).to.be.equal(1);
				expect(createEvent.callCount).to.be.equal(0);
				done();
			})
		});
	});
});