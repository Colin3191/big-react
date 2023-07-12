import { Props, Key, Ref } from 'shared/ReactTypes';
import { WorkTag } from './workTags';
import { Flags, NoFlags } from './fiberFlags';

export class FiberNode {
	tag: WorkTag;
	key: Key;
	stateNode: any;
	type: any;
	return: FiberNode | null;
	sibling: FiberNode | null;
	child: FiberNode | null;
	index: number;
	ref: Ref;
	pendingProps: Props;
	memoizedProps: Props | null;
	alternate: FiberNode | null;
	flags: Flags;
	constructor(tag: WorkTag, pendingProps: Props, key: Key) {
		/* 作为静态数据结构的属性 */
		this.tag = tag;
		this.key = key;
		// Fiber对应的真实DOM节点
		this.stateNode = null;
		// 对于 FunctionComponent，指函数本身，对于ClassCompoent，指class，对于HostComponent，指DOM节点tagName
		this.type = null;

		/* 用于连接其他Fiber节点形成Fiber树 */
		// 指向父级Fiber节点
		this.return = null;
		// 指向右边第一个兄弟Fiber节点
		this.sibling = null;
		// 指向子Fiber节点
		this.child = null;
		this.index = 0;

		this.ref = null;

		// 作为动态的工作单元的属性
		this.pendingProps = pendingProps;
		this.memoizedProps = null;

		// 副作用
		this.flags = NoFlags;

		// 指向该fiber在另一次更新时对应的fiber
		this.alternate = null;
	}
}
