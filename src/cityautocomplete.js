import React from 'react';
import { ApolloProvider, Query } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import Downshift from 'downshift';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import _ from 'lodash';

const httpLink = new HttpLink({ 
    uri: '/graphql'
})



const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
})


const SEARCH_CITIES = gql`
  query searchCities($inputValue: String!) {
    searchCities(name: $inputValue) {
        id
        Country
      	City
        Region
        Latitude
        Longitude
    }
  }
`
    
function CityAutoComplete({onAddCity}) {
    return (
        <ApolloProvider client={client}>
            <div align="left">
                <ApolloAutocomplete
                    onAddCity={onAddCity}
                />
            </div>
        </ApolloProvider>
    )
}
function SetSelectedItemInTextBox(selectedItem){
    return (selectedItem ? (_.startCase(selectedItem.City) + ', '
        + ((selectedItem.Country === 'us') ? selectedItem.Region.toUpperCase() +
        ', ' + selectedItem.Country.toUpperCase() : selectedItem.Country.toUpperCase())) : '');
}

function ApolloAutocomplete({onAddCity}) {
    return (
        <Downshift onChange={onAddCity}
            itemToString={SetSelectedItemInTextBox}
            >
            {({
                inputValue,
                getInputProps,
                getMenuProps,
                getItemProps,
                selectedItem,
                highlightedIndex,
                isOpen,
            }) => (
                    <div>
                        <input {...getInputProps({ placeholder: "City!" })} />
                        <ApolloAutocompleteMenu
                            {...{
                                inputValue,
                                getMenuProps,
                                getItemProps,
                                selectedItem,
                                highlightedIndex,
                                isOpen,
                            }}
                        />
                    </div>
                )}
        </Downshift>
    )
}

function ApolloAutocompleteMenu({
    selectedItem,
    highlightedIndex,
    isOpen,
    getItemProps,
    getMenuProps,
    inputValue,
}) {
    if (!isOpen) {
        return null
    }

    return (
        <Query
            query={SEARCH_CITIES}
            variables={{
                inputValue,
            }}
        >
            {({ loading, error, data }) => {
                const allCities = (data && data.searchCities) || []

                if (loading) {
                    return <div>Loading...</div>
                }

                if (error) {
                    return <div>Error! ${error.message}</div>
                }

                return (
                    <ul
                        {...getMenuProps({
                            style: { padding: 0, margin: 0, listStyle: 'none' },
                        })}
                    >
                        {allCities.slice(0, 10).map((item, index) => (
                            <li
                                key={item.City + item.Region.toUpperCase() + item.Country.toUpperCase()}
                                {...getItemProps({
                                    index,
                                    item,
                                    style: {
                                        backgroundColor:
                                            highlightedIndex === index ? 'lightgray' : 'gray',
                                        fontWeight: selectedItem === item ? 'bold' : 'normal',
                                    },
                                })}
                            >
                                {_.startCase(item.City)}{', '}
                                {(item.Country === 'us') ? item.Region.toUpperCase() +
                                    ', ' + item.Country.toUpperCase() : item.Country.toUpperCase()}
                            </li>
                        ))}
                    </ul>
                )
            }}
        </Query>
    )
}

export default CityAutoComplete;

