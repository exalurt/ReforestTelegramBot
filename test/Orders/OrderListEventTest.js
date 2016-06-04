const chai				= require("chai");
const chaiAsPromised	= require('chai-as-promised');
chai.use(chaiAsPromised);
const expect			= chai.expect;
const sinon				= require('sinon');
const OrderListEvent	= require("../../build/Order/OrderListEvent");


describe("OrderListEvent", function() {
	describe("say '/listEvents'", function() {
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
				name: "event"
			}

			const reforest = {
				_sendMessage: sinon.spy()
			}
			const myfindUser = sinon.stub();
			myfindUser.withArgs({where:{username: "username"}}).returns(new Promise((resolve,reject) => resolve(user)));
			const findAll = sinon.stub().returns(new Promise((resolve,reject) => resolve([event])));

			const db = {
				User:{
					find: myfindUser
				},
				Event:{
					findAll: findAll
				}

			}
			const order = new OrderListEvent(db, reforest);
			
			order.execute({
				chat: {id: 42},
				from: {username: "username"},
				text: "/listUsers"
			}).then(function(){
				expect(reforest._sendMessage.callCount).to.be.equal(1);
				done();
			})
		});
	});
});