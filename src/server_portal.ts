/**
 * Created by Acery on 2017/10/27.
 */
import * as express from "express";
import * as compression from "compression";  // compresses requests
import * as bodyParser from "body-parser";
import * as logger from "morgan";
import * as errorHandler from "errorhandler";
import * as dotenv from "dotenv";
import * as path from "path";
import expressValidator = require("express-validator");
import CUtil from './utils/Utils'
import eventEmitter from './utils/EventEmitter'


/**
 * express server
 */
const app = express();
const port = process.env.PORT || 3000;


/**
 * express global configuration
 */
app.set("views", path.join(__dirname, "../views"));  // 绑定MVC中的View层
app.set("view engine", "pug");  // 使用渲染引擎
app.use(logger("dev"));  // 使用express 自带 logger -Morgan /*dev common combined short tiny*/
app.use(bodyParser.json());  // 处理http请求body里的application/json数据
app.use(bodyParser.urlencoded({extended: false}));  // for application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, "public"), {maxAge: 31557600000})); // 使用express静态转发，/js将转发到/public/js
app.use(expressValidator());

/* controller*/
import * as projectController from './controllers/project'
import * as memberController from './controllers/member'
import * as manageController from './controllers/managment'

console.log('serving')



/**
 * express get to render configuration
 */
app.get('/',projectController.homeProjHandler);
app.get('/broadcast', (req, res) => {
    res.render('broadcast', {active: 'broadcast'})
});
app.get('/home',projectController.homeProjHandler);
app.get('/categories',projectController.cateHandler);
app.get('/department', memberController.allMemberHandler);
app.get('/management', manageController.managePageHandler);
app.get('/contact', (req, res) => {res.render('contact', {active: 'contact'})});

/* query by especial id*/
app.get('/categories/:cate', projectController.cateProjHandler);
app.get('/project/:id', projectController.projHandler);


/*testapi*/
app.get('/testapi', (req, res) => {
    res.render('notfound')
});




/**
 * 404 not found page
 */
app.get('*', (req, res) => {
    res.render('notFound')
}); // 404处理


/*error handle*/
app.use(errorHandler());

/**
 * start server port
 */
app.listen(port, () => {
    console.log(`server listen at ${port}`);
});



