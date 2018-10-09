/**
 * Created by jakubniezgoda on 18/05/2017.
 */

Stage.defineWidget({
    id: 'nodesStats',
    name: 'Nodes statistics',
    description: 'This widget shows number of node instances in different states',
    initialWidth: 4,
    initialHeight: 22,
    color : 'green',
    isReact: true,
    hasReadme: true,
    permission: Stage.GenericConfig.WIDGET_PERMISSION('nodesStats'),
    categories: [Stage.GenericConfig.CATEGORY.CHARTS_AND_STATISTICS],

    initialConfiguration: [
        Stage.GenericConfig.POLLING_TIME_CONFIG(10)
    ],
    fetchUrl: '[manager]/node-instances?_include=id,node_id,deployment_id,state,relationships,runtime_properties[params:deployment_id]',

    fetchParams: function(widget, toolbox) {
        return {
            deployment_id: toolbox.getContext().getValue('deploymentId')
        }
    },

    render: function(widget, data, error, toolbox) {
        if (_.isEmpty(data)) {
            return <Stage.Basic.Loading/>;
        }

        let {PieGraph} = Stage.Basic.Graphs;
        let {NodeInstancesConsts} = Stage.Common;
        let states = _.countBy(data.items, 'state');
        let formattedData = _.map(NodeInstancesConsts.groupStates, (groupState) =>
            ({
                name: _.upperFirst(groupState.name),
                color: groupState.colorHTML,
                value: _.sum(_.map(groupState.states, (state) => _.isNumber(states[state]) ? states[state] : 0))
            })
        );

        return (
            <PieGraph widget={widget} data={formattedData} toolbox={toolbox}/>
        );
    }
});