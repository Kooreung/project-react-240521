import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  Input,
  Select,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faAnglesRight,
  faMagnifyingGlass,
  faUserPen,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

export function BoardList() {
  const [boardList, setBoardList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [searchType, setSearchType] = useState("all");
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    axios.get(`/api/board/list?${searchParams}`).then((res) => {
      setBoardList(res.data.boardList);
      setPageInfo(res.data.pageInfo);
    });
    const typeParam = searchParams.get("type");
    const keywordParam = searchParams.get("keyword");
    if (typeParam) {
      setSearchType(typeParam);
    }
    if (keywordParam) {
      setSearchKeyword(keywordParam);
    }
  }, [searchParams]);

  const pageNumbers = [];
  for (let i = pageInfo.leftPageNumber; i <= pageInfo.rightPageNumber; i++) {
    pageNumbers.push(i);
  }

  function handleSearchClick() {
    navigate(`/?type=${searchType}&keyword=${searchKeyword}`);
  }

  return (
    <Box>
      <Box fontWeight={"bold"}>게시물 목록</Box>
      <Box>
        {boardList.length === 0 && <Center>조회 결과가 없습니다.</Center>}
        {boardList.length > 0 && (
          <Table>
            <Thead>
              <Tr>
                <Th>#</Th>
                <Th>TITLE</Th>
                <Th>
                  <FontAwesomeIcon icon={faUserPen} /> WRITER
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {boardList.map((board) => (
                <Tr
                  key={board.id}
                  onClick={() => navigate(`/board/${board.id}`)}
                  cursor={"pointer"}
                  _hover={{ bgColor: "gray.50" }}
                >
                  <Td>{board.id}</Td>
                  <Td>{board.title}</Td>
                  <Td>{board.writer}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Box>
      <Center>
        <Flex>
          <Box>
            <Select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
            >
              <option value="all">전체</option>
              <option value="text">글</option>
              <option value="nickName">작성자</option>
            </Select>
          </Box>
          <Box>
            <Input
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="검색어"
            />
          </Box>
          <Box>
            <Button onClick={handleSearchClick}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Button>
          </Box>
        </Flex>
      </Center>
      <Box>
        <Center>
          {pageInfo.prevPageNumber && (
            <>
              <Button onClick={() => navigate(`/?page=1`)}>
                <FontAwesomeIcon icon={faAnglesLeft} />
              </Button>
              <Button
                onClick={() => navigate(`/?page=${pageInfo.prevPageNumber}`)}
              >
                <FontAwesomeIcon icon={faAngleLeft} />
              </Button>
            </>
          )}
          {pageNumbers.map((pageNumber) => (
            <Button
              onClick={() => navigate(`/?page=${pageNumber}`)}
              key={pageNumber}
              colorScheme={
                pageNumber === pageInfo.currentPageNumber ? "blue" : "gray"
              }
            >
              {pageNumber}
            </Button>
          ))}
          {pageInfo.nextPageNumber && (
            <>
              <Button
                onClick={() => navigate(`/?page=${pageInfo.nextPageNumber}`)}
              >
                <FontAwesomeIcon icon={faAngleRight} />
              </Button>
              <Button
                onClick={() => navigate(`/?page=${pageInfo.lastPageNumber}`)}
              >
                <FontAwesomeIcon icon={faAnglesRight} />
              </Button>
            </>
          )}
        </Center>
      </Box>
    </Box>
  );
}
