import { Router } from 'express';

import ListAddressController from '../../app/Http/Controllers/AddressApi/ListAddressController.js';
import GetAddressController from '../../app/Http/Controllers/AddressApi/GetAddressController.js';
import CreateAddressController from '../../app/Http/Controllers/AddressApi/CreateAddressController.js';
import UpdateAddressController from '../../app/Http/Controllers/AddressApi/UpdateAddressController.js';
import DeleteAddressController from '../../app/Http/Controllers/AddressApi/DeleteAddressController.js';

export default (() => {
    const router = Router();

    router.get('/', ListAddressController);

    router.get('/:id', GetAddressController);

    router.post('/', CreateAddressController);

    router.put('/:id', UpdateAddressController);

    router.delete('/:id', DeleteAddressController);

    return router;
})();