import * as React from 'react';
import Tile from "./Tile";

interface IProps {
    currency: string,
}

class ServicesList extends React.Component<IProps> {

    constructor(props: IProps) {
        super(props);
    }

    public render() {
        return (
            <section>


                <Tile
                    currency={ this.props.currency }
                    color="#1ed760"
                    title="Spotify"
                />

            </section>
        );
    }
}

export default ServicesList;