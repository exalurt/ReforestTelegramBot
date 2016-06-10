const chai				= require("chai");
const chaiAsPromised	= require('chai-as-promised');
chai.use(chaiAsPromised);
const expect			= chai.expect;
const sinon				= require('sinon');
const OrderList			= require("../../build/Order/OrderList");


describe("OrderList", function() {
	describe("say '/listUsers'", function() {
		it("listed", function(done) {
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
			const findAll = sinon.stub().returns(new Promise((resolve,reject) => resolve([user, user, user])));

			const db = {
				User:{
					find: myfindUser,
					findAll: findAll
				}

			}
			const order = new OrderList(db, reforest);
			
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