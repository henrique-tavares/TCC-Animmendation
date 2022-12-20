import type { InjectionKey } from "vue";

import type { Emitter } from "mitt";
import mitt from "mitt";

export type EventToast =
  | {
      type: "error" | "success" | "info" | "warning";
      message: string;
    }
  | {
      type: "custom";
      customclass: string;
      message: string;
    };

export type Events = {
  "loading-modal": boolean;
  "add-toast": EventToast;
};

export const emitter = mitt<Events>();

export const emitterKey = Symbol("emitter") as InjectionKey<Emitter<Events>>;
