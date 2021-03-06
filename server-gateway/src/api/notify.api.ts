import {Router} from 'express';
import { notifyController } from '../controllers/notify.controller';

const router = Router();

/**
 * Single
 */
router.get('/:id', async (req: any, res, next) => {
	try {
		if (req.query.type)
			req.query.type = parseInt(req.query.type, 10);

		res.send(await notifyController.findById(req.user, req.params.id, req.query));
	} catch (error) {
		next(error);
	}
});

/**
 * List
 */
router.get('/', async (req: any, res, next) => {
	try {
		res.send(await notifyController.findMany(req.user, req.query));
	} catch (error) {
		next(error);
	}
});

/**
 * update unread
 */
router.put('/unread/:id', async (req: any, res, next) => {
	try {
		res.send(await notifyController.markUnread(req.user, req.params.id));
	} catch (error) {
		next(error);
	}
});

/**
 * update unread
 */
router.put('/unread', async (req: any, res, next) => {
	try {
		res.send(await notifyController.markAllUnread(req.user));
	} catch (error) {
		next(error);
	}
});

/**
 * update unread
 */
router.put('/reset-unread-counter', async (req: any, res, next) => {
	try {
		res.send(await notifyController.resetUnreadCount(req.user));
	} catch (error) {
		next(error);
	}
});

/**
 * Update
 */
router.put('/:id', async (req: any, res, next) => {
	try {
		res.send(await notifyController.update(req.user, req.params.id, req.body));
	} catch (error) {
		next(error);
	}
});

/**
 * delete
 */
router.delete('/:id', async (req: any, res, next) => {
	try {
		res.send(await notifyController.remove(req.user, req.params.id));
	} catch (error) {
		next(error);
	}
});


export = router;