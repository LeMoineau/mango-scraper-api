"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const useModals = () => {
    const [modalStates, setModalStates] = (0, react_1.useState)([]);
    const isVisible = (modal) => {
        const target = modalStates.find((m) => m.modal === modal);
        if (target) {
            return target.visible;
        }
        setModalStates([
            ...modalStates,
            {
                modal: modal,
                visible: false,
            },
        ]);
        return false;
    };
    const show = (modal) => {
        const tmpStates = [...modalStates];
        const target = tmpStates.find((m) => m.modal === modal);
        if (target) {
            target.visible = true;
        }
        else {
            tmpStates.push({
                modal: modal,
                visible: true,
            });
        }
        setModalStates(tmpStates);
    };
    const hide = (modal) => {
        const tmpStates = [...modalStates];
        const target = tmpStates.find((m) => m.modal === modal);
        if (target) {
            target.visible = false;
        }
        else {
            tmpStates.push({
                modal: modal,
                visible: false,
            });
        }
        setModalStates(tmpStates);
    };
    return {
        isVisible,
        show,
        hide,
    };
};
exports.default = useModals;
