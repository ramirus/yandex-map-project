import 'jsdom-global/register';
import React from "react";
import {mount, configure} from "enzyme";
import Adapter from 'enzyme-adapter-react-16';

import PointList from './index';
import Point from '../point';

configure({adapter: new Adapter()});

describe("PointList", () => {
    let props;
    let mountedScreen;
    const screen = () => {
        if (!mountedScreen) {
            mountedScreen = mount(
                <PointList {...props} />
            );
        }
        return mountedScreen;
    }

    beforeEach(() => {
        props = {
            pointList: [],
            reorder: () => {},
            removePoint: () => {},
        };
        mountedScreen = undefined;
    });

    it("always renders a DragDropContext", () => {
        const block = screen().find("DragDropContext");
        expect(block.length).toBeGreaterThan(0);
    });

    it('when pointList is empty point is not render', () => {
        const point = screen().find("Point");
        expect(point.length).toBe(0);
    });

    describe('point list', () => {
        beforeEach(() => {
            props.pointList = [{
                properties: {
                    get: () => {}
                }
            }];
        });

        it('when pointList is not empty point is render', () => {
            const point = screen().find("Point");
            expect(point.length).toBe(1);
        });
    })

    describe("when `removePoint` is defined", () => {
        beforeEach(() => {
            props = {
                removePoint: jest.fn(),
                pointList: [{
                    properties: {
                        get: () => {}
                    }
                }],
            };
        });

        it("sets the rendered `Point`'s `removePoint` prop to the same value as `removePoint`'", () => {
            const point = screen().find(Point);
            expect(point.props().removePoint).toBe(props.removePoint);
        });
    });

    describe("when `removePoint` is undefined", () => {
        beforeEach(() => {
            props = {
                removePoint: undefined,
                pointList: [{
                    properties: {
                        get: () => {}
                    }
                }],
            };
        });


        it("sets the rendered `Point`'s `removePoint` prop to undefined'", () => {
            const point = screen().find(Point);
            expect(point.props().removePoint).not.toBeDefined();
        });
    });
});