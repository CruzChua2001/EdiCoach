import React, { useState } from "react"
import styled from "styled-components"
import { Form, Button } from "react-bootstrap"
import { Search } from "react-bootstrap-icons"
import { useAllClient } from "../Context";
const axios = require('axios');

const Hr = styled.hr`
    margin-inline: 6%;
    margin-top: 1.5%;
`

const Searchbar = styled.div`
    margin-top: 2%;
`

const SearchClient = () => {
    const [search, setSearch] = useState("")
    const allClient = useAllClient()

    const getSearchClient = () => {
        let url = "https://i0lyxkgqc4.execute-api.us-east-1.amazonaws.com/uat/getallclients"
        if(search != ""){
            url = 'https://i0lyxkgqc4.execute-api.us-east-1.amazonaws.com/uat/?q=' + search + "*"
        }

        axios.get(url).then(resp => {
            console.log(resp.data)
            let result = resp.data
            if(search != ""){
                result = []
                resp.data.hits.hit.map(item => {
                    result.push(item.fields)
                })
                
            }
            allClient.setClientResult(result)
        });
    }

    return (
        <>
            <h2 className="mt-4 text-center primary-font-color">Search Clients</h2>

            <Hr />

            <div className="container">
                <Searchbar className="row">
                    <div className="col-lg-11">
                        <Form.Control
                            type="text"
                            placeholder="Search client's name"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        /> 
                    </div>
                    <div className="col-lg-1">
                        <Button variant='primary' onClick={getSearchClient}>
                            <Search />
                        </Button>
                    </div>
                </Searchbar>
            </div>
        </>
    )
}

export default SearchClient