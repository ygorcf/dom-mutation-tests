import { Subject } from 'rxjs';

export function doMutationTests() {
  const mutationListener: MutationCallback = (mutations) => {
    mutations.forEach((mutation) => {
      const { type, target } = mutation;
      const elString = `${target.nodeName}.${
        (target as HTMLElement).classList.value
      }`;

      mutationChanges.next(`${type} -> ${elString}`);
    });
  };
  const appRootEl = document.getElementById('mutation-app');

  const mutationObserver = new MutationObserver(mutationListener);
  mutationObserver.observe(appRootEl!, {
    attributes: true,
    childList: true,
    subtree: true,
  });
}

export const mutationChanges = new Subject<string>();
