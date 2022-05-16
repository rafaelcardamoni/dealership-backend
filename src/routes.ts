import { Router } from 'express';
import multer from 'multer';
import { CreateCarController } from './controllers/cars/CreateCarController';
import { ListCarsController } from './controllers/cars/ListCarsController';
import { DeleteCarController } from './controllers/cars/DeleteCarController';
import { UpdateCarController } from './controllers/cars/UpdateCarController';
import { CreateUserController } from './controllers/users/CreateUserController';
import { ListUsersController } from './controllers/users/ListUsersController';
import { UpdateUserController } from './controllers/users/UpdateUserController';
import { DeleteUserController } from './controllers/users/DeleteUserController';
import { CreateImageController } from './controllers/images/CreateImageController';
import { ListImagesByCarController } from './controllers/images/ListImagesByCarController';
import { DeleteImageController } from './controllers/images/DeleteImageController';
import { AuthenticateUserController } from './controllers/authentication/AuthenticateUserController';
import { authenticated } from './middlewares/authenticated';
import { ListLimitedCarsController } from './controllers/cars/ListLimitedCarsController';
import { GetCarByIdController } from './controllers/cars/GetCarByIdController';
import cors from 'cors';
const router = Router();

const allowGetRequests = {
  origin: '*',
  methods: 'GET'
};

const allowRequests = {
  origin: [
    'https://dealership-frontend.vercel.app',
    'https://dealership-frontend-git-testing-rafaelcardamoni.vercel.app',
    'http:localhost:3000'
  ],
  methods: 'GET, POST, PUT, DELETE'
};

// middlewares
const multerConfig = require('./config/multer');

// controllers
const createCarController = new CreateCarController();
const listCarsController = new ListCarsController();
const deleteCarController = new DeleteCarController();
const updateCarController = new UpdateCarController();
const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();
const createImageController = new CreateImageController();
const listImagesByCarController = new ListImagesByCarController();
const deleteImageController = new DeleteImageController();
const listLimitedCarsController = new ListLimitedCarsController();
const getCarByIdController = new GetCarByIdController();

// authentication middleware
const authenticateUserController = new AuthenticateUserController();

// get requests
router.get('/car/:id', cors(allowGetRequests), getCarByIdController.handle);
router.get('/cars', cors(allowGetRequests), listCarsController.handle);
router.get(
  '/cars/:numOfCars',
  cors(allowGetRequests),
  listLimitedCarsController.handle
);
router.get('/users', cors(allowGetRequests), listUsersController.handle);
router.get(
  '/cars/images/:id',
  cors(allowGetRequests),
  listImagesByCarController.handle
);

// post requests
router.post('/cars/create', cors(allowRequests), createCarController.handle);
router.post('/users/create', cors(allowRequests), createUserController.handle);
router.post(
  '/cars/images/create/:car_id',
  multer(multerConfig).single('file'),
  cors(allowRequests),
  createImageController.handle
);
router.post('/login', cors(allowRequests), authenticateUserController.handle);

// delete requests
router.delete(
  '/cars/delete/:id',
  cors(allowRequests),
  deleteCarController.handle
);
router.delete(
  '/cars/images/delete/:id',
  cors(allowRequests),
  deleteImageController.handle
);
router.delete(
  '/users/delete/:id',
  cors(allowRequests),
  deleteUserController.handle
);

// put requests
router.put('/cars/update/:id', cors(allowRequests), updateCarController.handle);
router.put(
  '/users/update/:id',
  cors(allowRequests),
  updateUserController.handle
);

export { router };
