const chai				= require("chai");
const chaiAsPromised	= require('chai-as-promised');
chai.use(chaiAsPromised);
const expect			= chai.expect;
const sinon				= require('sinon');
const OrderCreateUser	= require("../../build/Order/OrderCreateUser");


describe("OrderCreateUser", function() {
	describe("say '/createUser user1 user2 user3'", function() {
		it("add users", function(done) {
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
			const numbulkCreate = sinon.spy();
			const stubBulkCreate = sinon.stub().returns(new Promise((resolve,reject) => resolve(["user1", "user2", "user3"])));

			const mybulkCreate = function(args){
				numbulkCreate();
				return stubBulkCreate(args);
			};

			const db = {
				User:{
					find: myfindUser,
					bulkCreate:mybulkCreate
				}
			}
			const order = new OrderCreateUser(db, reforest);
			
			order.execute({
				chat: {id: 42},
				from: {username: "username"},
				text: "/createUser user1 user2 user3"
			}).then(function(){
				expect(reforest._sendMessage.callCount).to.be.equal(1);
				expect(numbulkCreate.callCount).to.be.equal(1);
				done();
			})
		});
	});

	describe("say '/createUser'", function() {
		it("no users", function(done) {
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
			const numbulkCreate = sinon.spy();
			const stubBulkCreate = sinon.stub().returns(new Promise((resolve,reject) => resolve(["user1", "user2", "user3"])));

			const mybulkCreate = function(args){
				numbulkCreate();
				return stubBulkCreate(args);
			};

			const db = {
				User:{
					find: myfindUser,
					bulkCreate:mybulkCreate
				}
			}
			const order = new OrderCreateUser(db, reforest);
			
			order.execute({
				chat: {id: 42},
				from: {username: "username"},
				text: "/createUser"
			}).then(function(){
				expect(reforest._sendMessage.callCount).to.be.equal(1);
				expect(numbulkCreate.callCount).to.be.equal(0);
				done();
			})
		});
	});
});