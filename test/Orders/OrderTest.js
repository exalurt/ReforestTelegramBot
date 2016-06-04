const chai		= require("chai");
const chaiAsPromised	= require('chai-as-promised');
chai.use(chaiAsPromised);
const expect	= chai.expect;
const sinon		= require('sinon');
const Order		= require("../../build/Order/Order");


describe("Order", function() {
	describe("checkUser", function() {
		it("is checked", function() {
			//prepare
			const user = {
				userid:42,
				roll:'raso',
				save:function(){}
			};
			const reforest = {
				_sendMessage: sinon.spy()
			}

			const db = {
				User:{
					find: sinon.stub().returns(new Promise((resolve,reject) => resolve(user)))
				}
			}
			const order = new Order(db, reforest, 'jefazo');
			return expect(order.checkUser({
				chat: {Id: 42},
				from: {username: "username"}
			})).to.eventually.deep.equal(user);
		});


		it("is null", function() {
			//prepare
			const user = {
				userid:42,
				roll:'raso',
				save:function(){}
			};
			const reforest = {
				_sendMessage: sinon.spy()
			}

			const db = {
				User:{
					find: sinon.stub().returns(new Promise((resolve,reject) => resolve(null)))
				}
			}
			const order = new Order(db, reforest, 'jefazo');
			return expect(order.checkUser({
				chat: {Id: 42},
				from: {username: "username"}
			})).to.eventually.be.rejected;
		});
	});

	describe("validateUser", function() {
		it("is valid", function() {
			//prepare
			const user = {
				roll:'admin',
			};
			const reforest = {}

			const db = {}

			const order = new Order(db, reforest, 'jefazo admin');
			order.chatId = 42;
			return expect(order.validateUser(user)).to.eventually.deep.equal(user);
		});

		it("not valid", function() {
			//prepare
			const user = {
				roll:'raso',
			};
			const reforest = {}

			const db = {}

			const order = new Order(db, reforest, 'jefazo admin');
			order.chatId = 42;
			return expect(order.validateUser(user)).to.eventually.be.rejected;
		});
	});
});