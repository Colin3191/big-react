import { beginWork } from './beginWork';
import { completeWork } from './completeWork';
import { FiberNode, FiberRootNode, createWorkInProgress } from './fiber';
import { HostRoot } from './workTags';

let wokInProgress: FiberNode | null = null;

function prepareFreshStack(root: FiberRootNode) {
	wokInProgress = createWorkInProgress(root.current, {});
}

export function scheduleUpdateOnFiber(fiber: FiberNode) {
	// 调度功能
	const root = markUpdateFromFiberToRoot(fiber);
	renderRoot(root);
}

function markUpdateFromFiberToRoot(fiber: FiberNode) {
	let node = fiber;
	let parent = node.return;
	while (parent !== null) {
		node = parent;
		parent = node.return;
	}
	if (node.tag === HostRoot) {
		return node.stateNode;
	}
	return null;
}

function renderRoot(root: FiberRootNode) {
	// 初始化
	prepareFreshStack(root);

	do {
		try {
			workLoop();
			break;
		} catch (e) {
			if (__dev__) {
				console.warn('work发生错误');
			}
			wokInProgress = null;
		}
	} while (true);
}

function workLoop() {
	while (wokInProgress !== null) {
		performUnitOfWork(wokInProgress);
	}
}

function performUnitOfWork(fiber: FiberNode) {
	const next = beginWork(fiber);
	fiber.memoizedProps = fiber.pendingProps;
	// 没有子fiber
	if (next === null) {
		completeUnitOfWork(fiber);
	} else {
		wokInProgress = next;
	}
}

function completeUnitOfWork(fiber: FiberNode) {
	let node = fiber;

	do {
		completeWork(node);
		const sibling = node.sibling;
		if (sibling !== null) {
			wokInProgress = sibling;
			return;
		}
		node = node.return;
		wokInProgress = node;
	} while (node !== null);
}
