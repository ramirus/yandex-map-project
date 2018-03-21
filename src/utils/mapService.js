import ymaps from 'ymaps';

export default class MapService {
    constructor(mapContainer, center, updatePoints) {
        this.updatePoints = updatePoints;
        ymaps.load('https://api-maps.yandex.ru/2.1/?lang=ru_RU').then(maps => {
            this.mapApi = maps;
            let init = () => {
                this.map = new this.mapApi.Map(mapContainer, {
                    center: center,
                    zoom: 15,
                    controls: []
                });
            };
            this.mapApi.ready(init);
        }).catch(error => console.log('Failed to load Yandex Maps', error));
    }

    zoom() {
        this.map.setBounds(this.map.geoObjects.getBounds(),
            {
                checkZoomRange: true
            }
        ).then(() => {
            if (this.map.getZoom() > 15) {
                this.map.setZoom(15);
            }
        });
    }

    updateRoute() {
        this.map.geoObjects.remove(this.polyline);
        let length = this.map.geoObjects.getLength();
        let points = new Array(length);
        this.map.geoObjects.each(item => {
            let index = parseInt(item.properties.get('iconContent'), 10) - 1;
            points[index] = item.geometry.getCoordinates();
        });
        this.polyline = new this.mapApi.Polyline(
            points,
            {},
            {
                draggable: true,
                strokeColor: '#3c8db4',
                strokeWidth: 3,
            }
        );
        this.map.geoObjects.add(this.polyline);
    }

    updatePointCoordinates(newCoordinates, placeMark, index) {
        let coordinates = [newCoordinates[0].toFixed(6), newCoordinates[1].toFixed(6)];
        this.mapApi.geocode(coordinates).then(result => {
            placeMark.properties.set('balloonContent', result.geoObjects.get(0).getAddressLine());
            this.updatePoints(index, placeMark);
            this.updateRoute();
        }).catch(error => {
            console.log(error);
        })
    }

    updatePointsNum(placeMarks, startIndex, endIndex) {
        for(let i = startIndex; i <= endIndex; i++) {
            placeMarks[i].properties.set('iconContent', i + 1);
        }
        this.updateRoute();
    }

    addPoint(address, index) {
        return this.mapApi.geocode(address,
            {
                boundedBy: this.map.getBounds()
            }
        ).then(result => new Promise((resolve, reject) => {
                // [ x, y] coordinates
                let point = result.geoObjects.get(0).geometry.getCoordinates();
                let newPlacemark = new this.mapApi.Placemark(point, {
                        balloonContent: result.geoObjects.get(0).getAddressLine(),
                        iconContent: index + 1
                    }, {
                        draggable: true
                    }
                );
                newPlacemark.events.add("dragend", () => {
                    this.updatePointCoordinates(
                        newPlacemark.geometry.getCoordinates(),
                        newPlacemark,
                        parseInt(newPlacemark.properties.get('iconContent'), 10) - 1
                    );
                });

                this.map.geoObjects.add(newPlacemark);
                this.updateRoute();
                this.zoom();

                resolve(newPlacemark);
            })
        ).catch(error => {
            console.log(error);
        })
    }

    removePlacemark(placemark) {
        this.map.geoObjects.remove(placemark);
    }
}
