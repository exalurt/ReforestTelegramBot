const chai				= require("chai");
const chaiAsPromised	= require('chai-as-promised');
//const sinonChai			= require('sinon-chai');
chai.use(chaiAsPromised);
//chai.use(sinonChai);
const expect			= chai.expect;
const sinon				= require('sinon');
const OrderHelp			= require("../../build/Order/OrderHelp");


describe("OrderHelp", function() {
	describe("execute", function() {
		it("say /help", function(done) {
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
			const order = new OrderHelp(db, reforest);
			
			order.execute({
				chat: {Id: 42},
				from: {username: "username"}
			}).then(function(){
				expect(reforest._sendMessage.calledOnce).to.be.true;
				done();
			})
		});
	});

});