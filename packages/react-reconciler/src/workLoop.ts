import { beginWork } from './beginWork';
import { completeWork } from './completeWork';
import { FiberNode } from './fiber';

let wokInProgress: FiberNode | null = null;

function prepareFreshStack(fiber: FiberNode) {
	wokInProgress = fiber;
}

function renderRoot(root: FiberNode) {
	prepareFreshStack(root);

	do {
		try {
			workLoop();
			break;
		} catch (e) {
			console.warn('work发生错误');
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
