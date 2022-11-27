import React from "react"
import styled from "styled-components"
import { Form, Button } from "react-bootstrap"
import { Search } from "react-bootstrap-icons"

const Hr = styled.hr`
    margin-inline: 6%;
    margin-top: 1.5%;
`

const Searchbar = styled.div`
    margin-top: 2%;
`

const SearchClient = () => {
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
                        /> 
                    </div>
                    <div className="col-lg-1">
                        <Button variant='primary'>
                            <Search />
                        </Button>
                    </div>
                </Searchbar>
            </div>
        </>
    )
}

export default SearchClient