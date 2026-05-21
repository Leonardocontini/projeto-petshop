import { Router } from 'express';

import ListUserController from '../../app/Http/Controllers/UserApi/ListUserController.js';
import GetUserController from '../../app/Http/Controllers/UserApi/GetUserController.js';
import CreateUserController from '../../app/Http/Controllers/UserApi/CreateUserController.js';
import UpdateUserController from '../../app/Http/Controllers/UserApi/UpdateUserController.js';
import DeleteUserController from '../../app/Http/Controllers/UserApi/DeleteUserController.js';
import AddCourseController from '../../app/Http/Controllers/UserApi/AddCourseController.js';
import UploadImageController from '../../app/Http/Controllers/UserApi/UploadImageController.js';
import LoginController from '../../app/Http/Controllers/LoginController.js';
import VerifyImageMiddleware from '../../app/Http/Middlewares/VerifyImageMiddleware.js';

export default (() => {
    const router = Router();

    router.get('/', ListUserController);

    router.get('/:id', GetUserController);

    router.post('/', CreateUserController);

    router.put('/:id', UpdateUserController);

    router.post('/add-course/:id', AddCourseController);

    router.post('/image/:id', VerifyImageMiddleware, UploadImageController);

    router.delete('/:id', DeleteUserController);

    return router;
})();