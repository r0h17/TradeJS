import * as jwt from 'jsonwebtoken';
import * as request from 'request-promise';
import { FB, FacebookApiException } from 'fb';
import { userController } from "./user.controller";
import { G_ERROR_UNKNOWN } from "../../../shared/constants/constants";
import { log } from '../../../shared/logger';
import { IUser } from '../../../shared/interfaces/IUser.interface';
import { deviceController } from './device.controller';
import { symbolController } from './symbol.controller';
import { IReqUser } from '../../../shared/interfaces/IReqUser.interface';
import { notifyController } from './notify.controller';
import { eventController } from './event.controller';

const config = require('../../../tradejs.config');

export const authenticateController = {

	async authenticate(reqUser: IReqUser, params: { email?: string, password?: string, token?: string, device?: any }, options: { profile?: boolean } = {}): Promise<any> {

		if (params.token) {
			if (reqUser.id && reqUser.id !== params.token)
				throw new Error('header token and param token do not match');
		} else {
			params.token = reqUser.id;
		}

		let user: IUser;
		let userData: any = [];
		console.log(1);
		const results = await Promise.all([
			symbolController.getPublicList(),
			(async () => {

				if (params.email || params.password || params.token) {
					params['fields'] = ['favorites', 'name', 'img'];

					user = await request({
						uri: config.server.user.apiUrl + '/authenticate',
						headers: {
							_id: reqUser.id
						},
						method: 'POST',
						body: params,
						json: true
					});

					if (options.profile && user && user._id) {
						// get unread notification counter and active events (alarms) 
						userData = await Promise.all([
							notifyController.getUnreadCount({ id: user._id }),
							eventController.findMany({ id: user._id })
						]);
					}
				}
			})()
		]);
		console.log(2);
		return {
			symbols: results[0],
			notifications: {
				unreadCount: userData[0]
			},
			events: userData[1],
			user
		};
	},

	async authenticateFacebook(reqUser: IReqUser, params: { token: string }) {
		FB.options({accessToken: params.token});
		const result = await FB.api('/me');


		if (result && result.error) {
			if(result.error.code === 'ETIMEDOUT') {
				console.log('request timeout');
			}
			else {
				console.log('error', result.error);
			}
		}
		else {
			console.log(result);
		}
	},

	async requestPasswordReset(reqUser, email: string): Promise<void> {
		let user;

		try {
			user = await request({
				uri: config.server.user.apiUrl + '/authenticate/request-password-reset',
				headers: { '_id': reqUser.id },
				method: 'post',
				body: { email },
				json: true
			});
		} catch (error) {
			if (!error.error)
				throw ({ code: G_ERROR_UNKNOWN });

			return;
		}

		user.email = email;

		const result = await request({
			uri: config.server.notify.apiUrl + '/mail/request-password-reset',
			headers: { '_id': reqUser.id },
			method: 'POST',
			body: { user },
			json: true
		});

		console.log('reset', result);
	}
};
