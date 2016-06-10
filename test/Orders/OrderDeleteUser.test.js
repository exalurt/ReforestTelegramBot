const chai				= require("chai");
const chaiAsPromised	= require('chai-as-promised');
chai.use(chaiAsPromised);
const expect			= chai.expect;
const sinon				= require('sinon');
const OrderDeleteUser	= require("../../build/Order/OrderDeleteUser");


describe("OrderDeleteUser", function() {
	describe("say '/deleteUser user1 user2 user3'", function() {
		it("users deleted", function(done) {
			//prepare
			const userSave = sinon.spy();
			const userDestroyNum = sinon.spy();

			const user = {
				username: "user",
				userid: 42,
				roll: 'jefazo',
				save: userSave,
				destroy: function(){
					userDestroyNum();
					return new Promise((resolve,reject) => resolve())
				}
			};

			const event = {
				destroy: sinon.spy()
			}

			const mymessage = sinon.spy();
			const reforest = {
				_sendMessage: function(c,m){mymessage();}
			}
			const myfindUser = sinon.stub();
			myfindUser.withArgs({where:{username: "username"}}).returns(new Promise((resolve,reject) => resolve(user)));
			myfindUser.withArgs({where:{username: "user1"}}).returns(new Promise((resolve,reject) => resolve(user)));
			myfindUser.withArgs({where:{username: "user2"}}).returns(new Promise((resolve,reject) => resolve(user)));
			myfindUser.withArgs({where:{username: "user3"}}).returns(new Promise((resolve,reject) => resolve(user)));

			const db = {
				User:{
					find: myfindUser,
				}
			}
			const order = new OrderDeleteUser(db, reforest);

			order.execute({
				chat: {id: 42},
				from: {username: "username"},
				text: "/deleteUser user1 user2 user3"
			}).then(function(){
				expect(mymessage.callCount).to.be.equal(3);
				expect(userDestroyNum.callCount).to.be.equal(3);
				done();
			})
		});
	});
});