import * as dayjs from 'dayjs';
/**
 * @param target { createdAt: 1607406348 }
 * @param props  ['createdAt']
 * @return { createdAt: 2020/12/8/13 }
 */
const __transform = <T>(target: T, props: string[]): T => {
	props.forEach(prop => {
		target[prop] = target[prop]
			? dayjs(target[prop] as dayjs.ConfigType).format('YYYY/MM/DD')
			: '-';
	});
	return target;
};
export const formatDate = <T>(target: T | T[], props: string[]): T | T[] => {
	if (!Array.isArray(target)) {
		return __transform(target, props);
	}
	return target.map(item => {
		return __transform(item, props);
	});
};
