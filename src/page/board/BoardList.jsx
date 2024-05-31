import React, { useContext, useEffect, useState } from "react";
import {
  Badge,
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
  faComments,
  faHeart,
  faImage,
  faMagnifyingGlass,
  faUserPen,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LoginContext } from "../../component/LoginProvider.jsx";

export function BoardList() {
  const [boardList, setBoardList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [searchType, setSearchType] = useState("all");
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const account = useContext(LoginContext);

  useEffect(() => {
    axios.get(`/api/board/list?${searchParams}`).then((res) => {
      setBoardList(res.data.boardList);
      setPageInfo(res.data.pageInfo);
    });
    setSearchType("all");
    setSearchKeyword("");

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

  function handlePageButtonClick(pageNumber) {
    searchParams.set("page", pageNumber);
    navigate(`/?${searchParams}`);
  }

  return (
    <Center>
      <Box mb={10} w={{ base: 700, lg: 1000 }}>
        <Box fontWeight={"bold"} fontSize={"2xl"} mb={6} color={"blue.700"}>
          게시물 목록
        </Box>
        <Box>
          {boardList.length === 0 && <Center>조회 결과가 없습니다.</Center>}
          {boardList.length > 0 && (
            <Table>
              <Thead>
                <Tr borderY={"solid 2px gray"}>
                  <Th w={20}>#</Th>
                  <Th>TITLE</Th>
                  <Th w={20}>
                    <FontAwesomeIcon icon={faHeart} />
                  </Th>
                  <Th w={40}>
                    <FontAwesomeIcon icon={faUserPen} /> WRITER
                  </Th>
                </Tr>
              </Thead>
              <Tbody borderY={"solid 2px gray"}>
                {boardList.map((board) => (
                  <Tr
                    key={board.id}
                    onClick={() => navigate(`/board/${board.id}`)}
                    cursor={"pointer"}
                    _hover={{ bgColor: "gray.50" }}
                  >
                    <Td>{board.id}</Td>
                    <Td>
                      {board.title}
                      {board.numberOfImages && (
                        <Badge>
                          <FontAwesomeIcon icon={faImage} />
                          {board.numberOfImages}
                        </Badge>
                      )}
                      {board.numberOfComments > 0 && (
                        <Badge>
                          <FontAwesomeIcon icon={faComments} />
                          {board.numberOfComments}
                        </Badge>
                      )}
                    </Td>
                    <Td>{board.numberOfLike > 0 && board.numberOfLike}</Td>
                    <Td>{board.writer}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          )}
        </Box>
        <Box my={10}>
          <Flex align={"center"} justify={"space-between"}>
            <Box w={"102px"}></Box>
            <Center>
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
            </Center>
            <Flex>
              {account.isLoggedIn() && (
                <Box
                  p={{ base: 3, lg: 6 }}
                  fontSize={"large"}
                  fontWeight={"bold"}
                  onClick={() => navigate("/write")}
                  cursor={"pointer"}
                  _hover={{ bgColor: "gray.200" }}
                >
                  글쓰기
                </Box>
              )}
            </Flex>
          </Flex>
        </Box>
        <Box>
          <Center>
            {pageInfo.prevPageNumber && (
              <>
                <Button onClick={() => handlePageButtonClick(1)}>
                  <FontAwesomeIcon icon={faAnglesLeft} />
                </Button>
                <Button
                  onClick={() => handlePageButtonClick(pageInfo.prevPageNumber)}
                >
                  <FontAwesomeIcon icon={faAngleLeft} />
                </Button>
              </>
            )}
            {pageNumbers.map((pageNumber) => (
              <Button
                onClick={() => handlePageButtonClick(pageNumber)}
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
                  onClick={() => handlePageButtonClick(pageInfo.nextPageNumber)}
                >
                  <FontAwesomeIcon icon={faAngleRight} />
                </Button>
                <Button
                  onClick={() => handlePageButtonClick(pageInfo.lastPageNumber)}
                >
                  <FontAwesomeIcon icon={faAnglesRight} />
                </Button>
              </>
            )}
          </Center>
        </Box>
      </Box>
    </Center>
  );
}
