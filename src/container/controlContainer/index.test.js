import 'jsdom-global/register';
import React from "react";
import {mount, configure} from "enzyme";
import Adapter from 'enzyme-adapter-react-16';

import ControlContainer from './index';
import InputBox from '../../components/inputBox';
import PointList from '../../components/pointList';

configure({adapter: new Adapter()});

describe("ControlContainer", () => {
    let props;
    let mountedScreen;
    const screen = () => {
        if (!mountedScreen) {
            mountedScreen = mount(
                <ControlContainer {...props} />
            );
        }
        return mountedScreen;
    }

    beforeEach(() => {
        props = {
            pointList: [],
            handlePointSubmit: undefined,
            reorder: undefined,
            removePoint: undefined,
        };
        mountedScreen = undefined;
    });

    it("always renders a .control-container", () => {
        const block = screen().find(".control-container");
        expect(block.length).toBeGreaterThan(0);
    });

    describe("when `handlePointSubmit` is defined", () => {
        beforeEach(() => {
            props.handlePointSubmit = jest.fn();
        });

        it("sets the rendered `InputBox`'s `handlePointSubmit` prop to the same value as `handlePointSubmit`'", () => {
            const inputBox = screen().find(InputBox);
            expect(inputBox.props().handlePointSubmit).toBe(props.handlePointSubmit);
        });
    });

    describe("when `reorder` is defined", () => {
        beforeEach(() => {
            props.reorder = jest.fn();
        });

        it("sets the rendered `PointList`'s `reorder` prop to the same value as `reorder`'", () => {
            const pointList = screen().find(PointList);
            expect(pointList.props().reorder).toBe(props.reorder);
        });
    });

    describe("when `removePoint` is defined", () => {
        beforeEach(() => {
            props.removePoint = jest.fn();
        });

        it("sets the rendered `PointList`'s `removePoint` prop to the same value as `removePoint`'", () => {
            const pointList = screen().find(PointList);
            expect(pointList.props().removePoint).toBe(props.removePoint);
        });
    });
});